export const Toast = {
  show(message, type = "info") {
    const container = document.querySelector("#toast-container");
    if (!container) return;

    const bg = {
      success: "bg-green-600",
      error: "bg-red-600",
      warning: "bg-yellow-400 text-black",
      info: "bg-blue-600",
    }[type];

    const toast = document.createElement("div");
    toast.className = `px-2 py-3 min-w-[200px] rounded-lg text-white text-sm shadow-lg flex justify-center animate-slideIn animate-fadeOut
      ${bg}
    `;
    toast.innerText = message;

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
