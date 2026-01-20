import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type Equipment =
  | "airConditioner"
  | "wifi"
  | "eBoard"
  | "projector"
  | "microphone";

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  classroomNumber: string;
  name: string;
  capacity: number | "";
  equipment: Record<Equipment, boolean>;
}

const initialFormData: FormData = {
  classroomNumber: "",
  name: "",
  capacity: "",
  equipment: {
    airConditioner: false,
    wifi: false,
    eBoard: false,
    projector: false,
    microphone: false,
  },
};

export default function BookingDialog({ open, onClose }: BookingDialogProps) {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);

  // Effect to reset form data when dialog opens
  React.useEffect(() => {
    if (open) {
      setFormData(initialFormData);
    }
  }, [open]);

  const handleClose = () => {
    // We rely on the useEffect above to reset the form when the dialog opens.
    // We just call the parent's onClose handler here.
    onClose();
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleEquipmentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Отправка данных аудитории:", formData);
    // In a real application, you would send data to an API here.
    handleClose();
  };

  const equipmentOptions: { key: Equipment; label: string }[] = [
    { key: "airConditioner", label: "Кондиционер" },
    { key: "wifi", label: "Wi-Fi" },
    { key: "eBoard", label: "Электронная доска" },
    { key: "projector", label: "Проектор" },
    { key: "microphone", label: "Микрофон" },
  ];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Добавление аудитории</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="classroom-form">
          <Stack spacing={3} sx={{ pt: 1 }}>
            <TextField
              autoFocus
              required
              name="classroomNumber"
              label="Номер аудитории"
              fullWidth
              variant="outlined"
              value={formData.classroomNumber}
              onChange={handleFieldChange}
            />
            <TextField
              required
              name="name"
              label="Название"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleFieldChange}
            />
            <TextField
              required
              name="capacity"
              label="Вместимость"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.capacity}
              onChange={handleFieldChange}
              inputProps={{ min: 0 }}
            />

            <Typography variant="subtitle1" component="h2" sx={{ mt: 2 }}>
              Оборудование:
            </Typography>
            <FormGroup>
              <div className="flex flex-wrap">
                {equipmentOptions.map((option) => (
                  <div key={option.key} className="w-full sm:w-1/2 pb-2 pr-4">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.equipment[option.key]}
                          onChange={handleEquipmentChange}
                          name={option.key}
                        />
                      }
                      label={option.label}
                    />
                  </div>
                ))}
              </div>
            </FormGroup>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ color: "#2563EB" }} // Цвет текста кнопки "Отмена"
        >
          Отмена
        </Button>
        <Button
          type="submit"
          form="classroom-form"
          variant="contained"
          sx={{
            backgroundColor: "#2563EB", // Цвет фона кнопки "Добавить"
            "&:hover": {
              backgroundColor: "#1e40af", // Немного более темный цвет при наведении для UX
            },
          }}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
