import AppService from "../services/AppService";

export async function loadNavbarUser() {
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

  try {
    const user = await AppService.getProfile();
    const name = user.name || "U";
    const letter = name.charAt(0).toUpperCase();

    navbarEl.innerHTML = `
      <div class="relative group select-none">
        <div class="w-9 h-9 flex items-center justify-center bg-white/20 rounded-full text-white font-semibold cursor-pointer">
          ${letter}
        </div>

        <!-- Dropdown -->
        <div 
          class="absolute -right-1/2 w-48 bg-[#1a1a1a] text-white opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-100"
        >
          <a href="/auth/profile" 
             data-navigo 
             class="block px-4 py-2 hover:bg-white/10 transition">
             Thông tin người dùng
          </a>
          <a href="/auth/change-password" 
             data-navigo 
             class="block px-4 py-2 hover:bg-white/10 transition">
             Đổi mật khẩu
          </a>
          <a href="/auth/logout" 
             data-navigo 
             class="block px-4 py-2 hover:bg-white/10 transition">
             Đăng xuất
          </a>
        </div>
      </div>
    `;
  } catch (err) {
    console.log("Không load được user:", err);
  }
}
