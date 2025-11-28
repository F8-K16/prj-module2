import { registerHandle, loginHandle } from "./AuthController";

class UIController {
  constructor() {
    this.sidebar = null;
    this.overlay = null;
    this.searchModal = null;
    this.searchBox = null;
    this.dropdownUser = null;

    this.initialized = false;
    this._sidebarListenerRegistered = false;
    this._searchListenerRegistered = false;
  }

  initSidebar() {
    if (this._sidebarListenerRegistered) return;
    this._sidebarListenerRegistered = true;

    this.sidebar = document.querySelector("#sidebar");
    this.overlay = document.querySelector("#sidebar-overlay");

    const openBtn = document.querySelector("#sidebar-btn");
    const closeBtn = document.querySelector("#close-sidebar");

    if (!this.sidebar || !this.overlay) return;

    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openSidebar();
    });
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeSidebar();
    });
    this.overlay.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeSidebar();
    });

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-navigo]");
      if (!link) return;
      if (this.sidebar && this.sidebar.contains(link)) {
        this.closeSidebar();
      }
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

  toggleDropdownUser(forceState = null) {
    const dropdown = document.querySelector("#dropdown-user");
    if (!dropdown) return;

    const isHidden = dropdown.classList.contains("opacity-0");

    const shouldOpen = forceState !== null ? forceState : isHidden;

    if (shouldOpen) {
      dropdown.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "translate-y-2"
      );
      dropdown.classList.add("opacity-100", "translate-y-0");
    } else {
      dropdown.classList.add(
        "opacity-0",
        "pointer-events-none",
        "translate-y-2"
      );
      dropdown.classList.remove("opacity-100", "translate-y-0");
    }
  }

  hideDropdownUser() {
    this.toggleDropdownUser(false);
  }

  showDropdownUser() {
    const userBtn = document.querySelector("#user-btn");
    const dropdown = document.querySelector("#dropdown-user");

    if (!userBtn || !dropdown) return;

    userBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdownUser();
    });

    document.addEventListener("click", () => {
      this.hideDropdownUser();
    });
  }

  initNavbarSearchMobile() {
    if (this._searchListenerRegistered) return;
    this._searchListenerRegistered = true;
    const openBtn = document.querySelector("#open-search");
    const closeBtn = document.querySelector("#mobile-close-search");

    this.searchModal = document.querySelector("#mobile-search-modal");
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

    document.addEventListener("click", (e) => this._handleSearchOutside(e));
  }

  _handleSearchOutside(e) {
    if (!this.searchModal || this.searchModal.classList.contains("opacity-0"))
      return;
    if (this.searchModal.contains(e.target)) return;
    this.closeSearch();
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

  initHScroll() {
    document.querySelectorAll(".hscroll-inner").forEach((scrollEl) => {
      const container = scrollEl.parentElement;

      const prevBtn = container.querySelector(".hscroll-prev");
      const nextBtn = container.querySelector(".hscroll-next");

      if (!prevBtn || !nextBtn) return;

      const column = scrollEl.children[0];
      const columnWidth = column ? column.offsetWidth : 300;

      const gap = 24;

      const updateButtons = () => {
        const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;

        if (scrollEl.scrollLeft <= 0) {
          prevBtn.classList.add("opacity-30", "pointer-events-none");
        } else {
          prevBtn.classList.remove("opacity-30", "pointer-events-none");
        }

        if (scrollEl.scrollLeft >= maxScroll - gap * 2) {
          nextBtn.classList.add("opacity-30", "pointer-events-none");
        } else {
          nextBtn.classList.remove("opacity-30", "pointer-events-none");
        }
      };

      scrollEl.addEventListener("scroll", updateButtons);
      updateButtons();

      prevBtn.onclick = () => {
        scrollEl.scrollBy({
          left: -(columnWidth + gap),
          behavior: "smooth",
        });
      };

      nextBtn.onclick = () => {
        scrollEl.scrollBy({
          left: columnWidth + gap,
          behavior: "smooth",
        });
      };
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
    } else if (show === "register") {
      registerForm.classList.replace("hidden-form", "active-form");
    } else {
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

  loadNavbarUser() {
    const navbarEl = document.querySelector("#navbar-user");
    if (!navbarEl) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navbarEl.innerHTML = `
      <a href="/login" data-navigo>
        <button class="primary-btn">Đăng nhập</button>
      </a>
    `;
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const name = user.name || "U";
    const letter = name.charAt(0).toUpperCase();

    navbarEl.innerHTML = `
      <div class="relative group select-none">
        <button id="user-btn"class="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white font-semibold cursor-pointer hover:bg-white/30 transition">
           ${letter}
        </button>

        <div id="dropdown-user"
          class="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden
                bg-[#1f1f1f] shadow-lg border border-white/10
                opacity-0 pointer-events-none translate-y-2
                transition-all duration-150 z-50">
          <a href="/auth/profile"
            data-navigo
            class="block px-4 py-3 text-sm hover:bg-white/10 transition">
            Thông tin người dùng
          </a>

          <a href="/auth/change-password"
            data-navigo
            class="block px-4 py-3 text-sm hover:bg-white/10 transition">
            Đổi mật khẩu
          </a>

          <a href="/auth/logout"
            data-navigo
            class="block px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition">
            Đăng xuất
          </a>
        </div>
      </div>
    `;
    this.showDropdownUser();
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.initSidebar();
    this.loadSidebarUser();
    this.loadNavbarUser();
  }
}

export const UI = new UIController();
