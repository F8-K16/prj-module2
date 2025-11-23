export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return `
    <div>
        <aside
          id="desktop-sidebar"
          class="pt-8 hidden md:flex flex-col w-22 h-full bg-[#030303] backdrop-blur-xl
                text-white fixed top-16 left-0 z-20"
        >
          <nav class="flex flex-col items-center">
            <a
              href="/"
              data-navigo
              class="flex flex-col items-center justify-center gap-1 p-3
                    hover:bg-white/10 rounded-xl transition group"
            >
              <i class="fa-solid fa-house text-2xl"></i>
              <span class="text-[10px] text-gray-300 group-hover:text-white">
                Trang chủ
              </span>
            </a>

            <a
              href="/explore"
              data-navigo
              class="flex flex-col items-center justify-center gap-1 p-3
                    hover:bg-white/10 rounded-xl transition group"
            >
              <i class="fa-solid fa-compass text-2xl"></i>
              <span class="text-[10px] text-gray-300 group-hover:text-white">
                Khám phá
              </span>
            </a>

            <a
              href="/library"
              data-navigo
              class="flex flex-col items-center justify-center gap-1 p-3
                    hover:bg-white/10 rounded-xl transition group"
            >
              <i class="fa-solid fa-bookmark text-2xl"></i>
              <span class="text-[10px] text-gray-300 group-hover:text-white">
                Thư viện
              </span>
            </a>
            <div id="sidebar-login">
              ${
                !user
                  ? `
                  <hr class="my-3 w-full border-white/20 " />
                  <a
                    href="/login"
                    data-navigo
                    class="flex flex-col items-center justify-center gap-1 p-3
                          hover:bg-white/10 rounded-xl transition group"
                    >
                    <i class="fa-solid fa-users-rectangle text-2xl"></i>
                    <span class="text-[10px] text-gray-300 group-hover:text-white">
                        Đăng nhập
                    </span>
                  </a>
                `
                  : ""
              }
            </div>
          </nav>
        </aside>


        <!-- SIDEBAR SLIDE -->
        <aside
          id="sidebar"
          class="fixed top-0 left-0 w-56 h-full bg-black/95 backdrop-blur-xl 
                text-white transform -translate-x-full transition-transform duration-300 
                z-50 border-r border-white/10 pt-1"
        >
          <div class="flex gap-5 items-center pl-6 py-3">
            <button id="close-sidebar" class="act-btn flex hover:bg-white/10">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>

            <div class="flex items-center gap-1">
              <img src="/images/logo.png" alt="Logo" class="w-8 h-8 object-contain"/>
              <span class="text-xl font-semibold tracking-tight">Music</span>
            </div>
          </div>

          <nav class="flex flex-col p-3 select-none">
            <a href="/" data-navigo class="sidebar-item"><i class="fa-solid fa-house text-xl"></i><span>Trang chủ</span></a>
            <a href="/explore" data-navigo class="sidebar-item"><i class="fa-solid fa-compass text-xl"></i><span>Khám phá</span></a>
            <a href="/library" data-navigo class="sidebar-item"><i class="fa-solid fa-bookmark text-xl"></i><span>Thư viện</span></a>

            
            <div id="slider-sidebar-login" class="px-2">
            
                ${
                  !user
                    ? `
                <hr class="border-white/20 my-2" />
                <a href="/login" data-navigo class="block">
                  <button class="act-btn w-full mt-4 px-2 sm:px-4 flex justify-center bg-[#1d1d1d]">
                    Đăng nhập
                  </button>
                </a>
                <p class="mt-2 text-[12px] text-[#909090] leading-6">
                  Đăng nhập để tạo và chia sẻ danh sách phát, nhận nội dung đề xuất dành riêng cho bạn.
                </p>`
                    : ""
                }
            </div>

          </nav>
        </aside>

        <div 
          id="sidebar-overlay" 
          class="fixed inset-0 bg-black/80 opacity-0 pointer-events-none 
                transition-opacity duration-300 z-40 2xl:hidden"
        ></div>
    </div>
  `;
}
