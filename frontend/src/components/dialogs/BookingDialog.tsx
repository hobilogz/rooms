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
import utc from "dayjs/plugin/utc"; // Импорт плагина UTC
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru"; // Импортируем русскую локализацию для dayjs
import { ruRU } from "@mui/x-date-pickers/locales";

// Активируем плагин UTC для dayjs
dayjs.extend(utc);
dayjs.locale("ru"); // Устанавливаем русскую локализацию

interface Classroom {
  id: string;
  name: string;
}

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
}

interface BookingFormData {
  organizer: string;
  classroom: Classroom | null;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}

// Mock data for the classroom ComboBox
const mockClassrooms: Classroom[] = [
  { id: "101", name: "Аудитория 101" },
  { id: "102", name: "Лекционный зал 2" },
  { id: "103", name: "Компьютерный класс 3" },
  { id: "104", name: 'Конференц-зал "Нептун"' },
];

// Function to create a fresh set of Dayjs objects every time
const getInitialFormData = (): BookingFormData => ({
  organizer: "",
  classroom: null,
  // Создаются Dayjs объекты в ЛОКАЛЬНОМ времени (для отображения в пикерах)
  startDate: dayjs().add(1, "day").startOf("day"),
  endDate: dayjs().add(1, "day").startOf("day"),
  startTime: dayjs().hour(9).minute(0).second(0),
  endTime: dayjs().hour(10).minute(0).second(0),
});

export default function BookingDialog({ open, onClose }: BookingDialogProps) {
  const [formData, setFormData] =
    React.useState<BookingFormData>(getInitialFormData);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof BookingFormData, string>>
  >({});

  // Reset form data and errors when dialog opens
  React.useEffect(() => {
    if (open) {
      setFormData(getInitialFormData());
      setErrors({});
    }
  }, [open]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    onClose();
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (
    key: "startDate" | "endDate",
    newValue: Dayjs | null,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleTimeChange = (
    key: "startTime" | "endTime",
    newValue: Dayjs | null,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleClassroomChange = (newValue: Classroom | null) => {
    setFormData((prev) => ({
      ...prev,
      classroom: newValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      const start = formData.startDate!;
      const end = formData.endDate!;
      const startTime = formData.startTime!;
      const endTime = formData.endTime!;

      // Combine local date and time
      const fullStartTimeLocal = start
        .clone()
        .hour(startTime.hour())
        .minute(startTime.minute())
        .second(0);
      const fullEndTimeLocal = end
        .clone()
        .hour(endTime.hour())
        .minute(endTime.minute())
        .second(0);

      // Convert local time to UTC RFC 3339 string for server submission
      const startUtcString = fullStartTimeLocal.toISOString();
      const endUtcString = fullEndTimeLocal.toISOString();

      console.log("Отправка данных бронирования:");
      console.log("Организатор:", formData.organizer);
      console.log("Аудитория ID:", formData.classroom?.id);
      console.log("---");
      console.log(
        "Начало (Local Time):",
        fullStartTimeLocal.format("DD.MM.YYYY HH:mm"),
      );
      console.log(
        "Окончание (Local Time):",
        fullEndTimeLocal.format("DD.MM.YYYY HH:mm"),
      );
      console.log("---");
      console.log("Начало (UTC RFC 3339 для сервера):", startUtcString);
      console.log("Окончание (UTC RFC 3339 для сервера):", endUtcString);

      // API call here...

      handleClose();
    } else {
      console.error("Ошибка валидации формы");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Создание бронирования</DialogTitle>
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
            />

            <Autocomplete
              options={mockClassrooms}
              getOptionLabel={(option) => option.name}
              value={formData.classroom}
              onChange={(_, newValue) => handleClassroomChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Аудитория"
                  error={!!errors.classroom}
                  helperText={errors.classroom}
                />
              )}
            />

            {/* Wrap the DatePicker and TimePicker in LocalizationProvider */}
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
                  onChange={(newValue) =>
                    handleDateChange("startDate", newValue)
                  }
                  enableAccessibleFieldDOMStructure={false}
                  format="DD.MM.YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
                <DatePicker
                  label="Дата окончания"
                  value={formData.endDate}
                  onChange={(newValue) => handleDateChange("endDate", newValue)}
                  enableAccessibleFieldDOMStructure={false}
                  format="DD.MM.YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={3}>
                <TimePicker
                  label="Время начала"
                  value={formData.startTime}
                  onChange={(newValue) =>
                    handleTimeChange("startTime", newValue)
                  }
                  enableAccessibleFieldDOMStructure={false}
                  format="HH:mm"
                  ampm={false}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
                <TimePicker
                  label="Время окончания"
                  value={formData.endTime}
                  onChange={(newValue) => handleTimeChange("endTime", newValue)}
                  enableAccessibleFieldDOMStructure={false}
                  format="HH:mm"
                  ampm={false}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </Stack>
            </LocalizationProvider>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "#2563EB" }}>
          ОТМЕНА
        </Button>
        <Button
          type="submit"
          form="booking-form"
          variant="contained"
          sx={{ backgroundColor: "#2563EB" }}
        >
          СОЗДАТЬ
        </Button>
      </DialogActions>
    </Dialog>
  );
}
