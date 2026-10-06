const appShell = document.querySelector("#app-shell");
const sidebar = document.querySelector("#sidebar");
const mainColumn = document.querySelector(".main-column");
const sidebarBackdrop = document.querySelector(".sidebar-backdrop");
const menuToggle = document.querySelector("#menu-toggle");
const currentPageLabel = document.querySelector("#current-page-label");
const pages = [...document.querySelectorAll(".page-view[data-page]")];
const navigationLinks = [...document.querySelectorAll("[data-route]")];
const drawerBreakpoint = window.matchMedia("(max-width: 760px)");
const pageNames = new Map(pages.map((page) => [page.dataset.page, page.querySelector("h1")]));

document.documentElement.classList.add("has-js");

function readRoute() {
  const requestedRoute = window.location.hash.slice(1).replace(/\/$/, "");
  return pageNames.has(requestedRoute) ? requestedRoute : "dashboard";
}

function renderRoute(route, focusHeading = false) {
  const selectedRoute = pageNames.has(route) ? route : "dashboard";

  for (const page of pages) {
    page.hidden = page.dataset.page !== selectedRoute;
  }

  for (const link of navigationLinks) {
    if (link.dataset.route === selectedRoute) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }

  const heading = pageNames.get(selectedRoute);
  currentPageLabel.textContent = heading.textContent;
  document.title = `${heading.textContent} — Task Agent`;

  if (focusHeading) {
    heading.focus({ preventScroll: true });
  }
}

function setDrawerOpen(open, restoreFocus = false) {
  const isOpen = drawerBreakpoint.matches && open;
  appShell.classList.toggle("is-drawer-open", isOpen);
  mainColumn.inert = isOpen;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
  sidebarBackdrop.hidden = !isOpen;
  sidebar.inert = drawerBreakpoint.matches && !isOpen;

  if (isOpen) {
    sidebar.querySelector('[aria-current="page"]')?.focus({ preventScroll: true });
  } else if (restoreFocus) {
    menuToggle.focus({ preventScroll: true });
  }
}

menuToggle.addEventListener("click", () => {
  setDrawerOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

sidebarBackdrop.addEventListener("click", () => setDrawerOpen(false, true));

for (const link of navigationLinks) {
  link.addEventListener("click", (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setDrawerOpen(false);
    renderRoute(link.dataset.route, true);
  });
}

window.addEventListener("hashchange", () => renderRoute(readRoute(), true));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && appShell.classList.contains("is-drawer-open")) {
    setDrawerOpen(false, true);
    return;
  }

  if (event.key === "Tab" && appShell.classList.contains("is-drawer-open")) {
    const focusableItems = [...sidebar.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((item) => !item.hasAttribute("hidden") && item.getAttribute("aria-hidden") !== "true");
    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];

    if (!sidebar.contains(document.activeElement)) {
      event.preventDefault();
      firstItem?.focus();
    } else if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem?.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem?.focus();
    }
  }
});

drawerBreakpoint.addEventListener("change", () => setDrawerOpen(false));
sidebar.inert = drawerBreakpoint.matches;
renderRoute(readRoute());
