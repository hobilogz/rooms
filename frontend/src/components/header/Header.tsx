import clsx from "clsx"; // Соединение CSS-классов, игнорирование false/undefined
import s from "./Header.module.css";
import type { NavItem, UserBrief } from "./header.types";
import { DEFAULT_NAV } from "./header.config"; // Конфигурация вкладок
import { getInitials } from "./header.utils"; // Мелкие хелперы (инициалы и проч.)
import { DomainRounded, NotificationsNoneOutlined } from "@mui/icons-material"; // Иконки MUI

// Публичный API шапки.
// - navItems: массив вкладок; если не передан — берём DEFAULT_NAV
// - activeNavId: id активной вкладки (подсветка + aria-current)
// - onNavigate: колбэк при клике по вкладке
// - user: данные пользователя (для аватара/инициалов)
// - onBellClick: клик по колокольчику (уведомления)
export interface HeaderProps {
  navItems?: NavItem[];
  activeNavId: string;
  onNavigate: (id: string) => void;
  user?: UserBrief;
  onBellClick?: () => void;
}

export function Header({
  navItems = DEFAULT_NAV,
  activeNavId,
  user,
  onBellClick,
}: HeaderProps) {
  return (
    // <header> как семантический контейнер шапки
    <header className={s.header}>
      <div className={s.row}>
        {/* Левая зона: логотип + название приложения */}
        <div className={s.brand}>
          <div className={s.logoBox} aria-hidden>
            {/* Иконка MUI внутри логотипа. Цвет берётся из currentColor */}
            <DomainRounded className={s.logoIc} />
          </div>
          <div className={s.app}>Room Booking</div>
        </div>

        {/* Центральная зона: навигация по вкладкам. aria-label даёт подпись навигации для скринридеров. */}
        <nav className={s.nav} aria-label="Основная навигация">
          {navItems.map((item) => {
            const active = item.id === activeNavId; // Флаг отслеживания "активности" вкладки
            return (
              // Кнопки вместо <a>: SPA-навигация, состоянием управляет родитель.
              // При желании можно заменить на <NavLink/>
              <button
                key={item.id}
                type="button"
                className={clsx(s.tab, active && s.tabActive)} // сообщаем наружу выбранную вкладку
                aria-current={active ? "page" : undefined}
                title={item.label}
                style={{ outline: "none" }}
              >
                {/* Иконка вкладки (если задана). */}
                {item.icon && <item.icon className={s.tabIc} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className={s.spacer} />

        {/* Правая зона: действия и пользователь */}
        <div className={s.right}>
          {/* Кнопка уведомлений; aria-label — текст для скринридеров */}
          <button
            type="button"
            className={s.iconBtn}
            onClick={onBellClick}
            aria-label="Уведомления"
            title="Уведомления"
          >
            <NotificationsNoneOutlined />
          </button>

          {/* Аватар пользователя.
                    Если есть avatarUrl — показываем картинку;
                    иначе — инициалы, рассчитанные утилитой getInitials(name). */}
          <div className={s.avatar} title={user?.name || "Гость"}>
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                width={32}
                height={32}
                style={{ borderRadius: "999px" }}
              />
            ) : (
              <span>{getInitials(user?.name)}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
