export default function PlayerUI() {
  return `
  <div id="player-wrapper"
       class="hidden fixed left-0 right-0 bottom-0 text-white bg-[#212121] border-t border-gray-800 z-30">

    <!-- Progress Bar -->
    <div class="w-full h-1 bg-gray-700 relative">
      <input 
        id="player-progress-bar"
        type="range" min="0" max="100" value="0"
        class="absolute top-1/2 left-0 w-full -translate-y-1/2 h-1 accent-red-500 cursor-pointer z-50"
      />
    </div>

    <!-- MAIN PLAYER -->
    <div class="flex flex-col md:flex-row px-4 py-2 md:py-3 min-h-16 gap-2">

      <!-- LEFT CONTROLS -->
      <div class="flex items-center gap-3 justify-center md:justify-start md:w-1/3">
        <button id="player-prev-btn" class="act-btn">
            <i class="fa-solid fa-backward-step text-lg md:text-xl"></i>
        </button>
        <button id="player-play-btn" class="act-btn">
            <i class="fa-solid fa-play text-3xl"></i>
        </button>
        <button id="player-next-btn" class="act-btn">
            <i class="fa-solid fa-forward-step text-lg md:text-xl"></i>
        </button>
       
        <div id="player-time" class="hidden lg:flex gap-1 text-sm text-gray-300">
            <span id="player-current">00:00</span> / 
            <span id="player-duration">00:00</span>
        </div>
      </div>

      <!-- MIDDLE -->
      <div class="flex flex-1 items-center justify-between gap-4 md:gap-3 flex-wrap">

        <div class="flex items-center gap-6 min-w-0 flex-1">
          <div id="player-thumbnail" class="w-10 h-10 bg-cover bg-center rounded shrink-0"></div>
          <div class="min-w-0">
            <div id="player-title" class="font-semibold text-base truncate">Bài hát A</div>
            <div id="player-artist" class="text-sm text-gray-400 truncate">Artist name</div>
          </div>

          <div class="hidden md:flex items-center gap-2">
            <button class="p-2 rounded-full hover:bg-gray-700"><i class="fa-regular fa-thumbs-down text-lg md:text-xl"></i></button>
            <button class="p-2 rounded-full hover:bg-gray-700"><i class="fa-regular fa-thumbs-up text-lg md:text-xl"></i></button>
            
            <button class="act-btn">
                <i class="fa-solid fa-ellipsis-vertical text-lg md:text-xl"></i>
            </button>
            
          </div>

          <div class="md:hidden relative">
            <button id="mobile-options-btn" class="p-2 rounded-full hover:bg-gray-700">
              <i class="fa-solid fa-ellipsis-vertical text-lg md:text-xl"></i>
            </button>
            <div id="mobile-options-menu" class="hidden absolute right-0 top-10 bg-[#2b2b2b] shadow-xl rounded-lg p-2 w-40">
              <button class="w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Thêm vào Playlist</button>
              <button class="w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Chia sẻ</button>
              <button class="w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Chi tiết bài hát</button>
            </div>
          </div>
        </div>

        <!-- RIGHT CONTROLS -->
        <div class="hidden sm:flex items-center gap-3 md:gap-3">
          <div class="flex items-center relative group">
            <button id="player-volume" class="act-btn">
                <i class="fa-solid fa-volume-high text-lg md:text-xl"></i>
            </button>
            
            <div class="md:block absolute right-12 top-1/2 -translate-y-1/2 px-2 pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-[#2b2b2b] rounded-lg shadow-lg transition duration-200">
              <input id="player-volume-slider" type="range" min="0" max="100" value="100" class="w-32 accent-white cursor-pointer" />
            </div>
          </div>

          <div class="flex items-center gap-2 md:gap-3">
          <button id="player-repeat-btn" class="act-btn">
                <i class="fa-solid fa-repeat text-lg md:text-xl"></i>
            </button>
            <button id="player-shuffle-btn" class="act-btn">
                <i class="fa-solid fa-shuffle text-lg md:text-xl"></i>
            </button>
          </div>
        </div>

        <div class="sm:hidden relative">
            <button id="mobile-right-toggle" class="p-2 rounded-full hover:bg-gray-700">
              <i class="fa-solid fa-caret-down text-lg rotate-90"></i>
            </button>
            
            <div id="mobile-right-menu" class=" absolute right-10 top-0 bg-[#2b2b2b] shadow-xl rounded-lg">
              <input id="player-volume-slider-mb" type="range" min="0" max="100" value="100" class="mx-2 w-28 accent-white cursor-pointer" />
              
              <button id="player-volume-mb" class="act-btn">
                  <i class="fa-solid fa-volume-high text-lg"></i>
              </button>
              <button id="player-repeat-btn-mb" class="act-btn">
                          <i class="fa-solid fa-repeat text-lg"></i>
              </button>
              <button id="player-shuffle-btn-mb" class="act-btn">
                          <i class="fa-solid fa-shuffle text-lg"></i>
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
  `;
}
