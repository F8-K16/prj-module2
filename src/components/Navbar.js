export default function Navbar() {
  return `
    <nav class="fixed top-0 left-0 right-0 z-50 w-full bg-[#030303]/90">
      <div class="text-white flex items-center justify-between px-2 h-18 sm:px-4">
        <div class="flex items-center gap-1 lg:gap-4 md:mr-[5%]">
        <button id="sidebar-btn" class="act-btn">
          <i class="fa-solid fa-bars text-xl"></i>
        </button>
        
        <a href="/" data-navigo class="flex items-center gap-1 ">
          <img src="/images/logo.png" alt="Logo" class="w-8 h-8 object-contain"/>
          <span class="text-xl font-semibold tracking-tight">Music</span>
        </a>
      </div>

      <div class='flex grow items-center justify-end gap-4 md:justify-between '>
        <div class="hidden md:flex items-center bg-[#292929]/80 backdrop-blur-sm px-4 py-1.5 lg:py-2.5 rounded w-[290px] lg:w-[470px]">
          <i class="fa-solid fa-magnifying-glass w-5 h-5 text-gray-300"></i>
          <input
            id="navbar-search-input"
            placeholder="Tìm bài hát, nghệ sĩ"
            class="bg-transparent outline-none px-3 w-full text-md text-white placeholder-gray-400"
          />
          <div id="search-dropdown" class="absolute left-0 right-0 top-full bg-[#121212] text-white rounded-lg shadow-lg mt-1 hidden z-9999"></div>
        </div>
        

      
        <div class="flex items-center gap-3 lg:gap-5 lg:mr-10">
          <button id="open-search" class="act-btn">
            <i class="fa-solid fa-magnifying-glass text-xl text-gray-300"></i>
          </button>

          <button class="hidden sm:flex p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-full transition">
            <i class="fa-brands fa-chromecast text-2xl text-gray-300"></i>
          </button>

          <button class="hidden sm:flex p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-full transition">
            <i class="fa-solid fa-ellipsis-vertical text-xl"></i>
          </button>

           <div id="navbar-user"></div>
        </div>
      </div>

      <!-- SEARCH MODAL -->
      <div id="mobile-search-modal" class="absolute left-0 top-0 right-0 bg-black/90 px-4 py-3 opacity-0 pointer-events-none transition-all duration-300 ease-out md:hidden">
        <div id="search-box" class="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-3 rounded-sm w-full translate-y-3 opacity-0 transition-all duration-300">
          <button id="mobile-close-search" class="act-btn">
            <i class="fa-solid fa-arrow-left text-white text-xl"></i>
          </button>
            <input
              id="mobile-search-input"
              placeholder="Tìm bài hát, nghệ sĩ"
              class="bg-transparent outline-none w-full text-sm text-white placeholder-gray-400"
              autofocus
              autocomplete="off"
            />
        </div>
        <div id="search-modal-results" class="mt-3"></div>
      </div>
      </div>
    </nav>
  `;
}
