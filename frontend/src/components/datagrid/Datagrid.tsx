// src/components/datagrid/Datagrid.tsx
import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
  type GridRowParams,
} from "@mui/x-data-grid";

import {
  fetchActiveBookings,
  deleteBooking,
  type BookingDto,
} from "../../api/BookingsApi";

type Props = {
  // сюда родитель передаст открытие диалога редактирования
  onEdit: (id: string) => void;
  // чтобы родитель мог обновлять таблицу после create/edit
  refreshKey?: number;
};

type Row = {
  id: string;
  organizer: string;
  audience: string;
  startTime: string;
  endTime: string;
};

function fmt(dtIso: string) {
  const d = new Date(dtIso);
  if (Number.isNaN(d.getTime())) return dtIso;
  return d.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DataGridDemo({ onEdit, refreshKey = 0 }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchActiveBookings(); // BookingDto[]
      const mapped: Row[] = data.map((b: BookingDto) => ({
        id: b.id,
        organizer: b.organizer ?? "—",
        audience: b.audience?.number ?? b.audienceId ?? "—",
        startTime: b.startTime,
        endTime: b.endTime,
      }));
      setRows(mapped);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // refreshKey меняется — перезагружаем
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Удалить бронирование?")) return;

    // оптимистично убираем строку
    const prev = rows;
    setRows((r) => r.filter((x) => x.id !== id));

    try {
      await deleteBooking(id);
      // можно не делать load(), но лучше чтобы синхронизировать состояние
      await load();
    } catch {
      // если ошибка — вернём как было
      setRows(prev);
    }
  };

  const columns = useMemo<GridColDef<Row>[]>(() => {
    return [
      {
        field: "organizer",
        headerName: "Организатор",
        flex: 1,
        minWidth: 200,
        editable: false,
      },
      {
        field: "audience",
        headerName: "Аудитория",
        width: 150,
        editable: false,
      },
      {
        field: "startTime",
        headerName: "Начало",
        width: 190,
        editable: false,
        valueFormatter: (v) => fmt(String(v)),
      },
      {
        field: "endTime",
        headerName: "Окончание",
        width: 190,
        editable: false,
        valueFormatter: (v) => fmt(String(v)),
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Действия",
        width: 110,
        getActions: (params: GridRowParams<Row>) => [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Редактировать"
            onClick={() => onEdit(String(params.id))}
            showInMenu
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Удалить"
            onClick={() => handleDelete(String(params.id))}
            showInMenu
          />,
        ],
      },
    ];
  }, [onEdit, rows]);

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

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
