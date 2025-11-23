export function loadSidebarUser() {
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
