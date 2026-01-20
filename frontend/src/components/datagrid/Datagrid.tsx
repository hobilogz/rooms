import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
  type GridRowParams, // Исправленный импорт
} from "@mui/x-data-grid";
import type { EventRow } from "./Datagrid.types";
import { Typography } from "@mui/material";

// Новый набор данных с учетом требуемых столбцов
const rows: EventRow[] = [
  {
    id: 1,
    audience: "Студенты 1-го курса",
    period: "Октябрь 2024",
    organizer: "Кафедра ИТ",
  },
  {
    id: 2,
    audience: "Преподаватели",
    period: "Ноябрь 2024",
    organizer: "Отдел кадров",
  },
  {
    id: 3,
    audience: "Аспиранты",
    period: "Декабрь 2024",
    organizer: "Научный отдел",
  },
  {
    id: 4,
    audience: "Сотрудники администрации",
    period: "Январь 2025",
    organizer: "Администрация",
  },
  {
    id: 5,
    audience: "Бакалавры 2-го курса",
    period: "Февраль 2025",
    organizer: "Деканат",
  },
  {
    id: 6,
    audience: "Магистранты",
    period: "Март 2025",
    organizer: "Центр повышения квалификации",
  },
  {
    id: 7,
    audience: "Инженеры",
    period: "Апрель 2025",
    organizer: "Технический отдел",
  },
  {
    id: 8,
    audience: "Все сотрудники",
    period: "Май 2025",
    organizer: "Профсоюз",
  },
  {
    id: 9,
    audience: "Выпускники",
    period: "Июнь 2025",
    organizer: "Центр карьеры",
  },
];

const columns: GridColDef<EventRow>[] = [
  {
    field: "audience",
    headerName: "Аудитория",
    width: 250,
    editable: false,
  },
  {
    field: "period",
    headerName: "Период",
    width: 200,
    editable: false,
  },
  {
    field: "organizer",
    headerName: "Организатор",
    flex: 1,
    editable: false,
  },
  // Сохраненный столбец "Действия"
  {
    field: "actions",
    type: "actions",
    headerName: "Действия",
    width: 100,
    // Использование GridRowParams<EventRow>
    getActions: (params: GridRowParams<EventRow>) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Редактировать"
        onClick={() => console.log("Редактировать строку:", params.id)}
        showInMenu
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Удалить"
        onClick={() => console.log("Удалить строку:", params.id)}
        showInMenu
      />,
    ],
  },
];

export default function DataGridDemo() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "30px",
        boxShadow: 0,
        border: "solid",
        borderColor: "#d6d6d6",
        borderWidth: "1px",
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
        Список бронирований
      </Typography>
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
