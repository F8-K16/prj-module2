import { registerHandle, loginHandle } from "./AuthController";

class UIController {
  constructor() {
    this.sidebar = null;
    this.overlay = null;
    this.searchModal = null;
    this.searchBox = null;
  }

  initSidebar() {
    this.sidebar = document.querySelector("#sidebar");
    this.overlay = document.querySelector("#sidebar-overlay");

    const openBtn = document.querySelector("#sidebar-btn");
    const closeBtn = document.querySelector("#close-sidebar");

    if (!this.sidebar || !this.overlay) return;

    openBtn?.addEventListener("click", () => this.openSidebar());
    closeBtn?.addEventListener("click", () => this.closeSidebar());
    this.overlay?.addEventListener("click", () => this.closeSidebar());

    document.querySelectorAll("a[data-navigo]").forEach((link) => {
      link.addEventListener("click", () => this.closeSidebar());
    });
  }

  openSidebar() {
    this.sidebar?.classList.remove("-translate-x-full");
    this.overlay?.classList.remove("opacity-0", "pointer-events-none");
  }

  closeSidebar() {
    this.sidebar?.classList.add("-translate-x-full");
    this.overlay?.classList.add("opacity-0", "pointer-events-none");
  }

  initNavbarSearch() {
    const openBtn = document.querySelector("#open-search");
    const closeBtn = document.querySelector("#close-search");

    this.searchModal = document.querySelector("#search-modal");
    this.searchBox = document.querySelector("#search-box");

    if (!openBtn || !closeBtn || !this.searchModal) return;

    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openSearch();
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeSearch();
    });

    document.addEventListener("click", (e) => {
      if (this.searchModal.contains(e.target)) return;
      this.closeSearch();
    });
  }

  openSearch() {
    this.searchModal.classList.remove("opacity-0", "pointer-events-none");
    this.searchBox.classList.remove("translate-y-3", "opacity-0");
  }

  closeSearch() {
    this.searchModal.classList.add("opacity-0", "pointer-events-none");
    this.searchBox.classList.add("translate-y-3", "opacity-0");
  }

  setActiveSidebar() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll("aside a[data-navigo]");

    links.forEach((link) => {
      if (link.href.includes("login")) return;
      const linkPath = link.getAttribute("href");

      if (linkPath === currentPath) {
        link.classList.add("sidebar-active");
      } else {
        link.classList.remove("sidebar-active");
      }
    });
  }

  highlightActiveSong(id) {
    document.querySelectorAll(".track-item").forEach((row) => {
      if (row.dataset.trackId === String(id)) {
        row.classList.add("playing");
      } else {
        row.classList.remove("playing");
      }
    });
  }

  initLoginForm() {
    const loginForm = document.querySelector("#login-form");
    const registerForm = document.querySelector("#register-form");

    const params = new URLSearchParams(window.location.search);
    const show = params.get("show");

    loginForm.classList.add("hidden-form");
    registerForm.classList.add("hidden-form");

    if (show === "login") {
      loginForm.classList.replace("hidden-form", "active-form");
    }
    // Hiển thị register nếu ?show=register
    else if (show === "register") {
      registerForm.classList.replace("hidden-form", "active-form");
    }
    // Mặc định login
    else {
      loginForm.classList.replace("hidden-form", "active-form");
    }

    document.getElementById("go-register").addEventListener("click", () => {
      loginForm.classList.replace("active-form", "hidden-form");
      registerForm.classList.replace("hidden-form", "active-form");
    });

    document.getElementById("go-login").addEventListener("click", () => {
      registerForm.classList.replace("active-form", "hidden-form");
      loginForm.classList.replace("hidden-form", "active-form");
    });

    registerForm.addEventListener("submit", registerHandle);
    loginForm.addEventListener("submit", loginHandle);
  }

  loadSidebarUser() {
    const token = localStorage.getItem("token");

    const sidebarLogin = document.querySelector("#sidebar-login");
    const sliderSidebarLogin = document.querySelector("#slider-sidebar-login");

    if (!sidebarLogin || !sliderSidebarLogin) return;

    if (token) {
      sidebarLogin.classList.add("hidden");
      sliderSidebarLogin.classList.add("hidden");
    } else {
      sidebarLogin.classList.remove("hidden");
      sliderSidebarLogin.classList.remove("hidden");
    }
  }

  async init() {
    this.initSidebar();
    this.initNavbarSearch();
  }
}

export const UI = new UIController();
