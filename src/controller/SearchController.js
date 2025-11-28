import AppService from "../services/AppService";
import { debounce } from "../utils/debounce";
import router from "../router/router";

class SearchController {
  constructor() {
    this.inputEl = null;
    this.dropdown = null;
    this.mobileInput = null;
    this.mobileModal = null;
    this.mobileResults = null;
  }

  init() {
    this.inputEl = document.querySelector("#navbar-search-input");
    this.dropdown = document.querySelector("#search-dropdown");
    this.mobileInput = document.querySelector("#mobile-search-input");
    this.mobileModal = document.querySelector("#mobile-search-modal");
    this.mobileResults = document.querySelector("#search-modal-results");

    if (this.inputEl) {
      this.inputEl.addEventListener(
        "input",
        debounce(this.handleSearch.bind(this), 350)
      );
    }

    if (this.mobileInput) {
      this.mobileInput.addEventListener(
        "input",
        debounce(this.handleMobileSearch.bind(this), 350)
      );
    }

    this.dropdown.addEventListener("click", (e) => {
      const item = e.target.closest("[data-action]");
      if (!item) return;

      const type = item.dataset.action;

      if (type === "suggest") {
        this.inputEl.value = item.dataset.value;
        this.handleSearch({ target: this.inputEl });
      }

      if (type === "navigate") {
        e.preventDefault();
        this.navigate(item.dataset.type, item.dataset.id);
      }
    });

    document.addEventListener("click", (e) => {
      if (!this.dropdown.contains(e.target) && e.target !== this.inputEl) {
        this.hideDropdown();
      }
    });

    this.mobileResults.addEventListener("click", (e) => {
      const item = e.target.closest("[data-action='mobile-navigate']");
      if (!item) return;

      this.navigate(item.dataset.type, item.dataset.id);

      this.mobileModal.style.opacity = 0;
      this.mobileModal.style.pointerEvents = "none";
      this.mobileResults.innerHTML = "";
      this.mobileInput.value = "";
    });
  }

  async handleSearch(e) {
    const keyword = e.target.value.trim();

    if (!keyword) {
      this.hideDropdown();
      return;
    }

    const data = await AppService.Search.search(keyword);
    this.renderDropdown(data);
  }

  async handleMobileSearch(e) {
    const keyword = e.target.value.trim();

    if (!keyword) {
      this.mobileResults.innerHTML = "";
      return;
    }

    const data = await AppService.Search.search(keyword);
    this.renderMobileResults(data);
  }

  renderDropdown(data) {
    const { suggestions = [], completed = [] } = data;

    if (!suggestions.length && !completed.length) {
      this.dropdown.innerHTML = `
        <div class="p-3 text-sm text-gray-300">
          Không tìm thấy kết quả
        </div>
      `;
      this.dropdown.classList.remove("hidden");
      return;
    }

    this.dropdown.innerHTML = `
      <div class="p-3 border-b border-white/10">
        <p class="text-sm text-gray-300 mb-2">Gợi ý</p>
        ${suggestions
          .map(
            (text) => `
              <div class="px-3 py-2 hover:bg-white/10 cursor-pointer rounded text-sm"
                   data-action="suggest" data-value="${text}">
                ${text}
              </div>
            `
          )
          .join("")}
      </div>

      <div class="p-3">
        <p class="text-sm text-gray-300 mb-2">Kết quả</p>
        ${completed
          .map((item) => {
            const path = this.getPath(item.type, item.id);
            return `
              <a href="${path}" data-navigo
                 class="flex items-center gap-3 px-3 py-2 hover:bg-white/10 cursor-pointer rounded"
                 data-action="navigate" data-type="${item.type}" data-id="${
              item.id
            }">
                <img src="${
                  item.thumbnails?.[0]
                }" class="w-12 h-12 rounded object-cover"/>
                <div>
                  <p class="font-medium">${item.title}</p>
                  <p class="text-xs text-gray-400">${item.subtitle || ""}</p>
                </div>
              </a>
            `;
          })
          .join("")}
      </div>
    `;

    this.dropdown.classList.remove("hidden");
  }

  renderMobileResults(data) {
    const { completed = [] } = data;

    if (!completed.length) {
      this.mobileResults.innerHTML = `
      <p class="text-gray-400 text-sm mt-3">Không tìm thấy kết quả</p>
    `;
      return;
    }

    this.mobileResults.innerHTML = completed
      .map((item) => {
        const path = this.getPath(item.type, item.id);
        return `
        <div class="flex items-center gap-3 py-2 border-b border-white/10 cursor-pointer"
             data-action="mobile-navigate" data-type="${item.type}" data-id="${
          item.id
        }">
          <img src="${
            item.thumbnails?.[0]
          }" class="w-12 h-12 rounded object-cover"/>
          <div>
            <p class="font-medium">${item.title}</p>
            <p class="text-xs text-gray-400">${item.subtitle || ""}</p>
          </div>
        </div>
      `;
      })
      .join("");

    this.mobileResults.classList.remove("hidden");
  }

  navigate(type, id) {
    const path = this.getPath(type, id);
    router.navigate(path);
    this.hideDropdown();
  }

  getPath(type, id) {
    const routes = {
      playlist: `/playlists/details/${id}`,
      album: `/albums/details/${id}`,
      song: `/songs/details/${id}`,
      video: `/videos/details/${id}`,
    };
    return routes[type] || "/";
  }

  hideDropdown() {
    this.dropdown.classList.add("hidden");
    this.dropdown.innerHTML = "";
  }
}

export const search = new SearchController();
