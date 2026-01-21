import { useState } from "react";
import { Header } from "./components/header";
import Dashboard from "./components/dashboard/Dashboard";
import Datagrid from "./components/datagrid/Datagrid";
import QuickActions from "./components/quickactions/QuickActions";
import BookingDialog from "./components/dialogs/BookingDialog";
import "./App.css";

function App() {
  const [active, setActive] = useState("catalog");

  // состояние одного общего диалога
  const [bookingOpen, setBookingOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ключ для перезагрузки таблицы
  const [refreshKey, setRefreshKey] = useState(0);

  const openCreateBooking = () => {
    setEditingId(null);
    setBookingOpen(true);
  };

  const openEditBooking = (id: string) => {
    setEditingId(id);
    setBookingOpen(true);
  };

  const closeBookingDialog = () => setBookingOpen(false);

  const handleBookingSuccess = () => {
    // после create/edit — обновляем таблицу
    setRefreshKey((x) => x + 1);
  };

  return (
    <>
      <Header
        activeNavId={active}
        onNavigate={setActive}
        user={{ name: "Пользователь" }}
        onBellClick={() => console.log("bell")}
      />

      <main
        style={{
          padding: "16px",
          paddingLeft: "15%",
          marginTop: "0px",
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Dashboard />

        {/* таблица: загрузка с облака + edit/delete */}
        <Datagrid onEdit={openEditBooking} refreshKey={refreshKey} />

        {/* быстрые действия: открытие CREATE */}
        <QuickActions onCreateBooking={openCreateBooking} />

        {/* один общий диалог (create/edit) */}
        <BookingDialog
          open={bookingOpen}
          onClose={closeBookingDialog}
          bookingId={editingId}
          onSuccess={handleBookingSuccess}
        />
      </main>
    </>
  );
}

export default App;
