import Section from "./Section.js";
import HScroll from "./HScroll.js";
import { formatViews } from "../utils/formatViews.js";

export default function VideosList(title, items) {
  const VideoItem = (item) => `
    <a href="/videos/details/${
      item.id || item._id
    }" data-navigo class="w-60 md:w-80 lg:w-[340px] xl:w-[400px] -mb-6 cursor-pointer shrink-0 block group">
        <div class="relative">
            <img 
            src="${item.thumb}" 
            class="rounded-xl w-full h-[180px] lg:h-[200px] xl:h-60 object-cover mb-2 transition duration-200"
            />

            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200">
            </div>

            <!-- Play icon  -->
            <div 
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
        </div>

        <h3 class="text-white font-medium truncate my-2">${
          item.name || item.title
        }</h3>
        ${
          item.views
            ? `<p class="text-gray-400 text-sm truncate">${formatViews(
                item.views
              )} lượt xem</p>`
            : ""
        }
    </a>

  `;

  const html = items.map(VideoItem).join("");
  return Section(title, HScroll(html));
}
