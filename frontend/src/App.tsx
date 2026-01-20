import { useState } from "react";
import { Header } from "./components/header";
import Dashboard from "./components/dashboard/Dashboard";
import Datagrid from "./components/datagrid/Datagrid";
import QuickActions from "./components/quickactions/QuickActions";
import "./App.css";
function App() {
  const [active, setActive] = useState("catalog");
  return (
    <>
      {/* Передаем в шапку базовые параметры для её настройки*/}
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
        <Dashboard /> {/* Встраиваем компонент Dashboard */}
        <Datagrid />
        <QuickActions />
      </main>
    </>
  );
}

export default App;
