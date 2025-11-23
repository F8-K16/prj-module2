export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return `
    <nav class="fixed top-0 left-0 right-0 z-50 w-full bg-[#030303]/90">
      <div class="text-white flex items-center justify-between px-2 h-18 sm:px-4">
        <div class="flex items-center gap-1 lg:gap-4 md:mr-[5%]">
        <button id="sidebar-btn" class="act-btn">
          <i class="fa-solid fa-bars text-xl"></i>
        </button>
        
        <a href="/" class="flex items-center gap-1 ">
          <img src="/images/logo.png" alt="Logo" class="w-8 h-8 object-contain"/>
          <span class="text-xl font-semibold tracking-tight">Music</span>
        </a>
      </div>

      <div class='flex grow items-center justify-end gap-4 md:justify-between '>
        <div class="hidden md:flex items-center bg-[#292929]/80 backdrop-blur-sm px-4 py-1.5 lg:py-2.5 rounded w-[290px] lg:w-[470px]">
          <i class="fa-solid fa-magnifying-glass w-5 h-5 text-gray-300"></i>
          <input
            placeholder="Tìm bài hát, nghệ sĩ"
            class="bg-transparent outline-none px-3 w-full text-md text-white placeholder-gray-400"
          />
        </div>
      
        <div class="flex items-center gap-1 sm:gap-3 lg:gap-5 lg:mr-10">
          <button id="open-search" class="act-btn">
            <i class="fa-solid fa-magnifying-glass text-xl text-gray-300"></i>
          </button>

          <button class="act-btn">
            <i class="fa-brands fa-chromecast text-2xl text-gray-300"></i>
          </button>

          <button class="act-btn">
            <i class="fa-solid fa-ellipsis-vertical text-xl"></i>
          </button>

           <div id="navbar-user">
              ${
                user
                  ? `
                  <div class="relative group select-none">
                    <div class="w-9 h-9 flex items-center justify-center bg-white/20 rounded-full text-white font-semibold cursor-pointer">
                      ${user.name.charAt(0).toUpperCase()}
                    </div>

                    <div class="absolute -right-1/2 w-48 bg-[#1a1a1a] text-white opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-100">
                      <a href="/auth/profile" data-navigo class="block px-4 py-2 hover:bg-white/10">Thông tin người dùng</a>
                      <a href="/auth/change-password" data-navigo class="block px-4 py-2 hover:bg-white/10">Đổi mật khẩu</a>
                      <a href="/auth/logout" data-navigo class="block px-4 py-2 hover:bg-white/10">Đăng xuất</a>
                    </div>
                  </div>
                `
                  : `
                  <a href="/login" data-navigo>
                    <button class="primary-btn">Đăng nhập</button>
                  </a>
                `
              }
            </div>
        </div>
      </div>

      <!-- SEARCH MODAL -->
      <div id="search-modal" class="absolute left-0 top-0 right-0 bg-black/90 px-4 py-3 opacity-0 pointer-events-none transition-all duration-300 ease-out md:hidden">
        <div id="search-box" class="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-3 rounded-sm w-full translate-y-3 opacity-0 transition-all duration-300">
          <button id="close-search" class="act-btn">
            <i class="fa-solid fa-arrow-left text-white text-xl"></i>
          </button>
            <input
              id="search-input"
              placeholder="Tìm bài hát, nghệ sĩ"
              class="bg-transparent outline-none w-full text-sm text-white placeholder-gray-400"
              autofocus
              autocomplete="off"
            />
        </div>
      </div>
      </div>
    </nav>
  `;
}
