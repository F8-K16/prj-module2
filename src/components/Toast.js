export const Toast = {
  show(message, type = "info") {
    const container = document.querySelector("#toast-container");
    if (!container) return;

    const bg = {
      success: "toast-success",
      error: "toast-error",
      warning: "toast-warning",
      info: "toast-info",
    }[type];

    const toast = document.createElement("div");
    toast.className = `toast ${bg}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
  },

  success(msg) {
    this.show(msg, "success");
  },

  error(msg) {
    this.show(msg, "error");
  },

  warning(msg) {
    this.show(msg, "warning");
  },

  info(msg) {
    this.show(msg, "info");
  },
};
