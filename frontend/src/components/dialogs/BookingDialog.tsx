import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import { ruRU } from "@mui/x-date-pickers/locales";

import {
  createBooking,
  updateBooking,
  fetchBookingById,
} from "../../api/BookingsApi";

dayjs.extend(utc);
dayjs.locale("ru");

interface AudienceOption {
  id: string; // audience.number (01/02/03/04)
  name: string; // "Аудитория 01"
}

type Props = {
  open: boolean;
  onClose: () => void;
  bookingId: string | null; // null => create
  onSuccess?: () => void; // чтобы обновить таблицу
};

interface BookingFormData {
  organizer: string;
  audience: AudienceOption | null;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}

// минимальный список аудиторий
const audiences: AudienceOption[] = [
  { id: "01", name: "Аудитория 01" },
  { id: "02", name: "Аудитория 02" },
  { id: "03", name: "Аудитория 03" },
  { id: "04", name: "Аудитория 04" },
];

const getInitialFormData = (): BookingFormData => ({
  organizer: "",
  audience: null,
  startDate: dayjs().add(1, "day").startOf("day"),
  endDate: dayjs().add(1, "day").startOf("day"),
  startTime: dayjs().hour(9).minute(0).second(0),
  endTime: dayjs().hour(10).minute(0).second(0),
});

export default function BookingDialog({
  open,
  onClose,
  bookingId,
  onSuccess,
}: Props) {
  const isEdit = !!bookingId;

  const [formData, setFormData] =
    React.useState<BookingFormData>(getInitialFormData);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof BookingFormData, string>>
  >({});
  const [submitting, setSubmitting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // при открытии: create => reset; edit => load by id и заполнить
  React.useEffect(() => {
    if (!open) return;

    setErrors({});

    if (!bookingId) {
      setFormData(getInitialFormData());
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const b = await fetchBookingById(bookingId);

        const start = dayjs(b.startTime);
        const end = dayjs(b.endTime);

        setFormData({
          organizer: b.organizer ?? "",
          audience: audiences.find((a) => a.id === b.audienceId) ?? {
            id: b.audienceId,
            name: `Аудитория ${b.audience?.number ?? b.audienceId}`,
          },
          startDate: start.startOf("day"),
          endDate: end.startOf("day"),
          startTime: start,
          endTime: end,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [open, bookingId]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.organizer.trim())
      newErrors.organizer = "Введите организатора";
    if (!formData.audience) newErrors.audience = "Выберите аудиторию";
    if (!formData.startDate) newErrors.startDate = "Выберите дату начала";
    if (!formData.endDate) newErrors.endDate = "Выберите дату окончания";
    if (!formData.startTime) newErrors.startTime = "Выберите время начала";
    if (!formData.endTime) newErrors.endTime = "Выберите время окончания";

    if (
      formData.startDate &&
      formData.endDate &&
      formData.startTime &&
      formData.endTime
    ) {
      const start = formData.startDate
        .clone()
        .hour(formData.startTime.hour())
        .minute(formData.startTime.minute())
        .second(0);

      const end = formData.endDate
        .clone()
        .hour(formData.endTime.hour())
        .minute(formData.endTime.minute())
        .second(0);

      if (!end.isAfter(start)) {
        newErrors.endTime = "Окончание должно быть позже начала";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const start = formData
      .startDate!.clone()
      .hour(formData.startTime!.hour())
      .minute(formData.startTime!.minute())
      .second(0);

    const end = formData
      .endDate!.clone()
      .hour(formData.endTime!.hour())
      .minute(formData.endTime!.minute())
      .second(0);

    // серверу нужны ISO date-time
    const payload = {
      organizer: formData.organizer.trim(),
      audienceId: formData.audience!.id,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    };

    try {
      setSubmitting(true);
      if (bookingId) {
        await updateBooking(bookingId, payload);
      } else {
        await createBooking(payload);
      }
      onSuccess?.();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={submitting ? undefined : onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {isEdit ? "Редактирование бронирования" : "Создание бронирования"}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit} id="booking-form">
          <Stack spacing={3} sx={{ paddingTop: "10px" }}>
            <TextField
              autoFocus
              required
              name="organizer"
              label="Организатор"
              fullWidth
              variant="outlined"
              value={formData.organizer}
              onChange={handleFieldChange}
              error={!!errors.organizer}
              helperText={errors.organizer}
              disabled={submitting || loading}
            />

            <Autocomplete
              options={audiences}
              getOptionLabel={(o) => o.name}
              value={formData.audience}
              onChange={(_, newValue) =>
                setFormData((prev) => ({ ...prev, audience: newValue }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Аудитория"
                  error={!!errors.audience}
                  helperText={errors.audience}
                  disabled={submitting || loading}
                />
              )}
            />

            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={
                ruRU.components.MuiLocalizationProvider.defaultProps.localeText
              }
            >
              <Stack direction="row" spacing={3}>
                <DatePicker
                  label="Дата начала"
                  value={formData.startDate}
                  onChange={(v) =>
                    setFormData((prev) => ({ ...prev, startDate: v }))
                  }
                  enableAccessibleFieldDOMStructure={false}
                  format="DD.MM.YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      disabled: submitting || loading,
                    },
                  }}
                />
                <DatePicker
                  label="Дата окончания"
                  value={formData.endDate}
                  onChange={(v) =>
                    setFormData((prev) => ({ ...prev, endDate: v }))
                  }
                  enableAccessibleFieldDOMStructure={false}
                  format="DD.MM.YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      disabled: submitting || loading,
                    },
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={3}>
                <TimePicker
                  label="Время начала"
                  value={formData.startTime}
                  onChange={(v) =>
                    setFormData((prev) => ({ ...prev, startTime: v }))
                  }
                  enableAccessibleFieldDOMStructure={false}
                  format="HH:mm"
                  ampm={false}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      disabled: submitting || loading,
                      error: !!errors.startTime,
                      helperText: errors.startTime,
                    },
                  }}
                />
                <TimePicker
                  label="Время окончания"
                  value={formData.endTime}
                  onChange={(v) =>
                    setFormData((prev) => ({ ...prev, endTime: v }))
                  }
                  enableAccessibleFieldDOMStructure={false}
                  format="HH:mm"
                  ampm={false}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      disabled: submitting || loading,
                      error: !!errors.endTime,
                      helperText: errors.endTime,
                    },
                  }}
                />
              </Stack>
            </LocalizationProvider>
          </Stack>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ color: "#2563EB" }}
          disabled={submitting || loading}
        >
          ОТМЕНА
        </Button>
        <Button
          type="submit"
          form="booking-form"
          variant="contained"
          sx={{ backgroundColor: "#2563EB" }}
          disabled={submitting || loading}
        >
          {isEdit ? "СОХРАНИТЬ" : "СОЗДАТЬ"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
