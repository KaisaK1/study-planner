"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/hooks";
import { Icon } from "../Icon/Icon";
import type { IconName } from "../Icon/IconSet";
import styles from "./Layout.module.css";

interface NavItem {
  path: string;
  label: string;
  icon: IconName;
}

export function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const { App, Nav } = useTranslations();
  const pathname = usePathname();

  const mainNav: readonly NavItem[] = [
    { path: "/dashboard", label: Nav.Dashboard, icon: "dashboard" },
    { path: "/studies", label: Nav.Studies, icon: "studies" },
    { path: "/curriculums", label: Nav.Curriculums, icon: "curriculums" },
    { path: "/schedule", label: Nav.Schedule, icon: "schedule" },
  ];

  const settingsNav: NavItem = {
    path: "/settings",
    label: Nav.Settings,
    icon: "settings",
  };

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  const renderLink = (item: NavItem) => (
    <Link
      href={item.path}
      className={`${styles.sidebar__link} ${isActive(item.path) ? styles.isActive : ""}`}
      aria-current={isActive(item.path) ? "page" : undefined}
    >
      <Icon name={item.icon} className={styles.sidebar__icon} />
      <span className={styles.sidebar__label}>{item.label}</span>
    </Link>
  );

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar__brand}>
          <h1 className={styles.sidebar__title}>{App.Name}</h1>
          <p className={styles.sidebar__user}>{App.UserPlaceholder}</p>
        </div>

        <nav className={styles.sidebar__nav}>
          <ul>
            {mainNav.map((item) => (
              <li key={item.path}>{renderLink(item)}</li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebar__footer}>{renderLink(settingsNav)}</div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
