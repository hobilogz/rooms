import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddRoomDialog from "../dialogs/AddRoomDialog";

type Props = {
  onCreateBooking: () => void;
};

const QuickActions: React.FC<Props> = ({ onCreateBooking }) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleAddDialogOpen = () => setOpenAddDialog(true);
  const handleAddDialogClose = () => setOpenAddDialog(false);

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: 0,
        border: "solid",
        borderColor: "#d6d6d6",
        borderWidth: "1px",
        marginTop: "30px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: "16px",
          textAlign: "left",
          color: "#0F172A",
        }}
      >
        Быстрые действия
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        {/* Кнопка "Добавить аудиторию" */}
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            minWidth: "200px",
            textAlign: "left",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "16px",
            outline: "none",
            "&:focus": { outline: "none" },
            gap: 3,
            borderRadius: "8px",
            borderColor: "#e7e7e7",
            "&:hover": {
              borderColor: "#cecece",
              backgroundColor: "#f7f7f7",
            },
          }}
          onClick={handleAddDialogOpen}
        >
          <Box
            sx={{
              backgroundColor: "#DBEAFE",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
            }}
          >
            <AddIcon sx={{ color: "#2563EB", fontSize: "33px" }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                textTransform: "none",
                color: "#0F172A",
                textAlign: "left",
              }}
            >
              Добавить аудиторию
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                textTransform: "none",
                color: "text.secondary",
                textAlign: "left",
              }}
            >
              Создать новую аудиторию
            </Typography>
          </Box>
        </Button>

        {/* Кнопка "Создать бронирование" */}
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            minWidth: "200px",
            textAlign: "left",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "16px",
            outline: "none",
            "&:focus": { outline: "none" },
            gap: 3,
            borderRadius: "8px",
            borderColor: "#e7e7e7",
            "&:hover": {
              borderColor: "#cecece",
              backgroundColor: "#f7f7f7",
            },
          }}
          onClick={onCreateBooking}
        >
          <Box
            sx={{
              backgroundColor: "#DCFCE7",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
            }}
          >
            <EditCalendarIcon sx={{ color: "#399b5b", fontSize: "25px" }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                textTransform: "none",
                color: "#0F172A",
                textAlign: "left",
              }}
            >
              Создать бронирование
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                textTransform: "none",
                color: "text.secondary",
                textAlign: "left",
              }}
            >
              Забронировать аудиторию
            </Typography>
          </Box>
        </Button>

        {/* Кнопка "Массовое редактирование" */}
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            minWidth: "200px",
            textAlign: "left",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "16px",
            outline: "none",
            "&:focus": { outline: "none" },
            gap: 3,
            borderRadius: "8px",
            borderColor: "#e7e7e7",
            "&:hover": {
              borderColor: "#cecece",
              backgroundColor: "#f7f7f7",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFEDD5",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
            }}
          >
            <EditNoteIcon sx={{ color: "#eba64b", fontSize: "33px" }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                textTransform: "none",
                color: "#0F172A",
                textAlign: "left",
              }}
            >
              Массовое редактирование
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                textTransform: "none",
                color: "text.secondary",
                textAlign: "left",
              }}
            >
              Изменить несколько бронирований
            </Typography>
          </Box>
        </Button>
      </Box>

      {/* Диалоговое окно добавления аудитории (можно оставить как есть) */}
      <AddRoomDialog open={openAddDialog} onClose={handleAddDialogClose} />
    </Box>
  );
};

export default QuickActions;
