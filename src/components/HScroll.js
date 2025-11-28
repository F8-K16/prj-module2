export default function HScroll(itemsHtml) {
  return `
    <div class="relative">

      <div class="absolute right-0 -top-15 flex items-center gap-4 z-10">
        <button 
          class="hscroll-prev bg-white/10 hover:bg-white/20 text-white 
                 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition cursor-pointer">
          <i class="fa-solid fa-chevron-left text-xs"></i>
        </button>

        <button 
          class="hscroll-next bg-white/10 hover:bg-white/20 text-white 
                 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition cursor-pointer">
          <i class="fa-solid fa-chevron-right text-xs"></i>
        </button>
      </div>

      <div class="hscroll-inner flex gap-6 overflow-x-auto 
                  pb-10 lg:pb-14 scrollbar scroll-smooth">
        ${itemsHtml}
      </div>

    </div>
  `;
}
