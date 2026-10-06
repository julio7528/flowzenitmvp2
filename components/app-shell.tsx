"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { AuthenticatedUser, UserRole } from "@/auth/types";
import { ProductIcon, ProductIconLibrary } from "./product-icon";

const navGroups = [
  {
    label: "Espaço de trabalho",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "dashboard" as const },
      { label: "Tarefas", href: "/tarefas", icon: "tasks" as const },
      { label: "Agente", href: "/agente", icon: "agent" as const },
      { label: "Calendário", href: "/calendario", icon: "calendar" as const },
    ],
  },
  {
    label: "Preferências",
    items: [
      { label: "Configurações", href: "/configuracoes", icon: "settings" as const },
    ],
  },
] as const;

const pageLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tarefas": "Tarefas",
  "/agente": "Agente",
  "/calendario": "Calendário",
  "/configuracoes": "Configurações",
  "/admin": "Admin",
};

type AppShellUser = Pick<AuthenticatedUser, "name" | "email"> & {
  role: UserRole;
};

function initialsFor(user: AppShellUser): string {
  const source = user.name || user.email || "TA";
  const parts = source.includes("@") ? [source.split("@")[0]] : source.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((part) => part.charAt(0)).join("");
  return initials.toLocaleUpperCase("pt-BR") || "TA";
}

export function AppShell({
  user,
  logoutHref,
  children,
}: {
  user: AppShellUser;
  logoutHref: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/dashboard";
  const activePath = pathname === "/" ? "/dashboard" : pathname;
  const currentLabel = pageLabels[activePath] ?? "Acesso restrito";
  const displayName = user.name || user.email || "Conta";
  const [isCompact, setIsCompact] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const syncLayout = () => {
      setIsCompact(media.matches);
      if (!media.matches) setIsDrawerOpen(false);
      if (sidebarRef.current) sidebarRef.current.inert = media.matches && !isDrawerOpen;
      if (mainRef.current) mainRef.current.inert = media.matches && isDrawerOpen;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
        menuToggleRef.current?.focus({ preventScroll: true });
        return;
      }
      if (event.key !== "Tab" || !isDrawerOpen || !sidebarRef.current) return;

      const focusable = Array.from(
        sidebarRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((item) => !item.hidden && item.getAttribute("aria-hidden") !== "true");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!sidebarRef.current.contains(document.activeElement)) {
        event.preventDefault();
        first?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.documentElement.classList.add("has-js");
    syncLayout();
    if (isCompact && isDrawerOpen) {
      sidebarRef.current?.querySelector<HTMLElement>('[aria-current="page"]')?.focus({ preventScroll: true });
    }
    media.addEventListener("change", syncLayout);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      media.removeEventListener("change", syncLayout);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isCompact, isDrawerOpen]);

  const adminItems = user.role === "admin"
    ? [{ label: "Admin", href: "/admin", icon: "admin" as const }]
    : [];

  return (
    <>
      <ProductIconLibrary />
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <div className={isDrawerOpen && isCompact ? "app-shell is-drawer-open" : "app-shell"}>
        <aside ref={sidebarRef} className="sidebar" aria-label="Navegação do Task Agent">
          <Link className="brand" href="/dashboard" onClick={() => setIsDrawerOpen(false)} aria-label="Task Agent, Dashboard">
            <span className="brand-mark"><ProductIcon name="mark" /></span>
            <span className="brand-copy">
              <strong>Task Agent</strong>
              <span>Gestão de tarefas</span>
            </span>
          </Link>

          <nav id="primary-navigation" className="primary-navigation" aria-label="Navegação principal">
            {navGroups.map((group) => (
              <div className="nav-group" key={group.label}>
                <p className="nav-group-label">{group.label}</p>
                {group.items.map((item) => (
                  <Link
                    className="nav-item"
                    href={item.href}
                    key={item.href}
                    aria-current={activePath === item.href ? "page" : undefined}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <ProductIcon name={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            ))}
            {adminItems.length > 0 && (
              <div className="nav-group nav-group-admin">
                <p className="nav-group-label">Sistema</p>
                {adminItems.map((item) => (
                  <Link
                    className="nav-item"
                    href={item.href}
                    key={item.href}
                    aria-current={activePath === item.href ? "page" : undefined}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <ProductIcon name={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </nav>

          <div className="sidebar-footer">
            <span className="sidebar-footer-mark" aria-hidden="true" />
            <span>Sessão protegida</span>
          </div>
        </aside>

        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Fechar navegação"
          hidden={!isCompact || !isDrawerOpen}
          onClick={() => {
            setIsDrawerOpen(false);
            menuToggleRef.current?.focus({ preventScroll: true });
          }}
        />

        <div className="main-column">
          <header className="topbar">
            <div className="topbar-leading">
              <button
                ref={menuToggleRef}
                className="icon-button menu-toggle"
                type="button"
                aria-label={isDrawerOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-controls="primary-navigation"
                aria-expanded={isCompact && isDrawerOpen}
                onClick={() => setIsDrawerOpen((open) => !open)}
              >
                <ProductIcon name={isDrawerOpen ? "close" : "menu"} />
              </button>
              <div className="breadcrumb" aria-label="Localização atual">
                <span>Workspace</span>
                <span className="breadcrumb-separator" aria-hidden="true">/</span>
                <strong aria-current="page">{currentLabel}</strong>
              </div>
            </div>

            <div className="topbar-meta">
              <span className="preview-badge">Prévia do produto</span>
              <details className="account-placeholder account-menu">
                <summary className="account-trigger" aria-label={`${displayName}, abrir menu da conta`}>
                  <span className="account-avatar" aria-hidden="true">{initialsFor(user)}</span>
                  <span className="account-copy">
                    <strong>{displayName}</strong>
                    <span>Conta conectada</span>
                  </span>
                </summary>
                <div className="account-dropdown" aria-label="Menu da conta">
                  <p className="account-email">{user.email || "Conta conectada pelo ChatGPT"}</p>
                  <a className="dropdown-item" href={logoutHref}>Sair</a>
                </div>
              </details>
            </div>
          </header>

          <main ref={mainRef} className="page-content" id="main-content" tabIndex={-1} aria-live="polite">
            {children}
          </main>

          <footer className="page-footer">
            <span>Task Agent</span>
            <span>Base visual do produto</span>
          </footer>
        </div>
      </div>
    </>
  );
}
