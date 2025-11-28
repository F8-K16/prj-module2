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

    <!-- Player -->
    <div class="js-player flex items-center justify-between sm:px-3 md:px-4 py-2 min-h-16">

      <!-- Left controls -->
      <div class="player-act flex items-center lg:gap-3">
        <button id="player-prev-btn" class="hidden player-act md:flex p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-full transition">
            <i class="fa-solid fa-backward-step text-xl"></i>
        </button>
        <button id="player-play-btn" class="player-act act-btn">
            <i class="fa-solid fa-play text-3xl"></i>
        </button>
        <button id="player-next-btn" class="hidden player-act sm:flex p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-full transition">
            <i class="fa-solid fa-forward-step text-xl"></i>
        </button>
       
        <div id="player-time" class="hidden lg:flex items-center gap-1 text-sm text-gray-300">
            <span id="player-current">00:00</span> / 
            <span id="player-duration">00:00</span>
        </div>
      </div>

      <!-- Middle -->
      <div>
        <div class="flex items-center gap-4 lg:gap-6 min-w-0 flex-1">
          <div id="player-thumbnail" class="w-10 h-10 bg-cover bg-center rounded shrink-0"></div>
          <div class="min-w-0">
            <div id="player-title" class="font-semibold text-[14px] sm:text-base truncate">Bài hát A</div>
            <div id="player-artist" class="text-sm text-gray-400 truncate">Artist name</div>
          </div>

          <div class="hidden md:flex items-center gap-2">
            <button class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer"><i class="fa-regular fa-thumbs-down text-lg md:text-xl"></i></button>
            <button class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer"><i class="fa-regular fa-thumbs-up text-lg md:text-xl"></i></button>
          </div>

          <div class="hidden sm:flex relative group">
            <button id="mobile-options-btn" class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer">
              <i class="fa-solid fa-ellipsis-vertical text-lg md:text-xl"></i>
            </button>

            <div id="mobile-options-menu" class="hidden absolute flex flex-col -right-10 -top-34 bg-[#2b2b2b] shadow-xl rounded-lg p-2 w-50 z-999 group-hover:flex">
              <button class="player-act w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Thêm vào Playlist</button>
              <button class="player-act w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Chia sẻ</button>
              <button class="player-act w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Chi tiết bài hát</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right controls -->
      <div class="flex items-center gap-3 md:gap-3">
          <div class="hidden md:flex items-center relative group">
            <button id="player-volume" class="player-act act-btn">
                <i class="fa-solid fa-volume-high text-lg md:text-xl"></i>
            </button>
            
            <div class="player-act block absolute right-12 top-1/2 -translate-y-1/2 px-2 pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-[#2b2b2b] rounded-lg shadow-lg transition duration-200">
              <input id="player-volume-slider" type="range" min="0" max="100" value="100" class="player-act w-32 accent-white cursor-pointer" />
            </div>
          </div>

          <div class="hidden md:flex items-center gap-2 md:gap-3">
          <button id="player-repeat-btn" class="player-act act-btn">
                <i class="fa-solid fa-repeat text-lg md:text-xl"></i>
            </button>
            <button id="player-shuffle-btn" class="player-act act-btn">
                <i class="fa-solid fa-shuffle text-lg md:text-xl"></i>
            </button>
          </div>
      </div>

      <div class="player-act relative md:hidden">
          <button id="mobile-right-toggle" class="p-2 rounded-full hover:bg-gray-700">
              <i class="fa-solid fa-caret-down text-lg rotate-90"></i>
          </button>
            
          <div id="mobile-right-menu" class="hidden flex absolute right-10 top-0 bg-[#2b2b2b] shadow-xl rounded-lg">
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

  <!-- Expand player -->
  <div id="player-expanded"
      class="fixed inset-0 bg-[#121212] text-white z-50 flex flex-col bg-linear-to-b from-[#0f1417] via-[#0c1f21] to-[#0a0f10]">

    <div class="w-full flex justify-center py-2 mb-12">
      <div class="w-12 h-1.5 bg-gray-500 rounded-full"></div>
    </div>

    <div class="overflow-y-auto flex-1 px-5 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="flex flex-col items-center text-center gap-6">
          <img id="exp-thumb"
              class="w-80 h-80 lg:w-100 lg:h-100 rounded-xl object-cover shadow-[0_0_25px_#0d948880]"/>

          <div class="space-y-1">
            <h2 id="exp-title" class="text-xl font-semibold text-teal-400"></h2>
            <p id="exp-artist" class="text-gray-300 italic"></p>
          </div>

          <!-- Main controls -->
          <div class="flex items-center justify-center gap-4 md:gap-10 lg:gap-4 xl:gap-10 mt-8 xl:mt-10">
            <div class="flex relative group">
              <button class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer">
                <i class="fa-solid fa-ellipsis-vertical text-lg md:text-xl"></i>
              </button>

              <div class="hidden absolute flex flex-col -right-10 -top-34 bg-[#2b2b2b] shadow-xl rounded-lg p-2 w-50 z-999 group-hover:flex">
                <button class="w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Thêm vào Playlist</button>
                <button class="w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Chia sẻ</button>
                <button class="w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Chi tiết bài hát</button>
            </div>
          </div>
            <div class="flex flex-col items-center gap-3 relative group">
              <button id="exp-volume-btn" class="act-btn">
                  <i class="fa-solid fa-volume-high text-xl"></i>
              </button>

              <input 
                  id="exp-volume-slider"
                  type="range" 
                  min="0" 
                  max="100" 
                  value="100"
                  class="exp-volume-slider opacity-0 group-hover:opacity-100 transition 
                    absolute bottom-23 -rotate-90 w-28 accent-white cursor-pointer 
                    pointer-events-none group-hover:pointer-events-auto"
              />
            </div>

            <button id="exp-prev-btn" class="act-btn">
              <i class="fa-solid fa-backward-step text-2xl"></i>
            </button>

            <button id="exp-play-btn" class="act-btn">
              <i class="fa-solid fa-play text-3xl"></i>
            </button>

            <button id="exp-next-btn" class="act-btn">
              <i class="fa-solid fa-forward-step text-2xl"></i>
            </button>

            <button id="exp-repeat-btn" class="act-btn">
              <i class="fa-solid fa-repeat text-xl"></i>
            </button>

            <button id="exp-shuffle-btn" class="act-btn">
                <i class="fa-solid fa-shuffle text-xl"></i>
            </button>
          </div>

          <!-- Progress -->
          <div class="w-full flex flex-col gap-2 px-6 mt-4">
            <input id="exp-progress" type="range" min="0" max="100" value="0"
                  class="w-full accent-red-500 cursor-pointer"/>
            <div class="flex justify-between text-sm text-gray-400">
              <span id="exp-current">00:00</span>
              <span id="exp-duration">00:00</span>
            </div>
          </div>

        </div>

        <!-- RIGHT: Related Tracks -->
        <div>
          <h3 class="text-2xl font-semibold mb-4 border-b border-teal-600/40 pb-2">Danh sách phát liên quan</h3>
          <div id="exp-related-list" class="flex flex-col overflow-y-auto overscroll-y-contain"></div>
        </div>

      </div>
    </div>

    <!-- Close button -->
    <button id="player-expanded-close"
            class="absolute top-4 right-4 p-3 rounded-full bg-black/40 backdrop-blur-sm hover:bg-teal-600/40 hover:text-teal-300 transition duration-200 shadow-lg">
      <i class="fa-solid fa-xmark text-2xl"></i>
    </button>
  </div>

  `;
}
