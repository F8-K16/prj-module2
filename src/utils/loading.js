export const loading = {
  show() {
    document.querySelector("#app-loading")?.classList.remove("hidden");
  },
  hide() {
    document.querySelector("#app-loading")?.classList.add("hidden");
  },
};
