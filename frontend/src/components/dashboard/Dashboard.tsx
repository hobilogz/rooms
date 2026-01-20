import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  LibraryBooks,
  CheckCircle,
  Event,
  Handyman,
} from "@mui/icons-material";

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        marginTop: "10px",
        alignItems: "left",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Заголовок и описание */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: "16px",
          textAlign: "left",
          color: "#0F172A",
        }}
      >
        Каталог аудиторий
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          marginBottom: "32px",
          textAlign: "left",
        }}
      >
        Управляйте информацией об аудиториях, их оборудованием и местоположением
      </Typography>

      {/* Блок с карточками */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Карточка "Всего аудиторий" */}
        <Card
          sx={{
            width: "22%",
            minWidth: "250px",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            borderRadius: 4,
            boxShadow: 0,
            border: "solid",
            borderColor: "#d6d6d6",
            borderWidth: "1px",
          }}
        >
          <CardContent
            sx={{
              textAlign: "left",
              padding: "33px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#bbd3eb9c",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "60px",
                height: "60px",
                marginBottom: "10px",
              }}
            >
              <LibraryBooks
                sx={{ fontSize: 30, color: "#1976d2", padding: "3px" }}
              />
            </Box>
            <Typography variant="h4">3</Typography>
            <Typography fontSize={"18px"} color="text.secondary">
              Всего аудиторий
            </Typography>
          </CardContent>
        </Card>
        {/* Карточка "Доступные сейчас" */}
        <Card
          sx={{
            width: "22%",
            minWidth: "250px",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            borderRadius: 4,
            boxShadow: 0,
            border: "solid",
            borderColor: "#d6d6d6",
            borderWidth: "1px",
          }}
        >
          <CardContent
            sx={{
              textAlign: "left",
              padding: "33px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#a4dda79a",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "60px",
                height: "60px",
                marginBottom: "10px",
              }}
            >
              <CheckCircle
                sx={{ fontSize: 30, color: "#4caf50", padding: "3px" }}
              />
            </Box>
            <Typography variant="h4">3</Typography>
            <Typography fontSize={"18px"} color="text.secondary">
              Доступные сейчас
            </Typography>
          </CardContent>
        </Card>
        {/* Карточка "Забронированные" */}
        <Card
          sx={{
            width: "22%",
            minWidth: "250px",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            borderRadius: 4,
            boxShadow: 0,
            border: "solid",
            borderColor: "#d6d6d6",
            borderWidth: "1px",
          }}
        >
          <CardContent
            sx={{
              textAlign: "left",
              padding: "33px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#ffdfb5e3",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "60px",
                height: "60px",
                marginBottom: "10px",
              }}
            >
              <Event sx={{ fontSize: 30, color: "#ff9800", padding: "3px" }} />
            </Box>
            <Typography variant="h4">2</Typography>
            <Typography fontSize={"18px"} color="text.secondary">
              Забронировано
            </Typography>
          </CardContent>
        </Card>
        {/* Карточка "Единицы оборудования" */}
        <Card
          sx={{
            width: "22%",
            minWidth: "250px",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            borderRadius: 4,
            boxShadow: 0,
            border: "solid",
            borderColor: "#d6d6d6",
            borderWidth: "1px",
          }}
        >
          <CardContent
            sx={{
              textAlign: "left",
              padding: "33px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#e6ceebc5",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "60px",
                height: "60px",
                marginBottom: "10px",
              }}
            >
              <Handyman
                sx={{ fontSize: 30, color: "#9c27b0", padding: "3px" }}
              />
            </Box>
            <Typography variant="h4">8</Typography>
            <Typography fontSize={"18px"} color="text.secondary">
              Единиц оборудования
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
