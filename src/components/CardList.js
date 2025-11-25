import Section from "./Section.js";
import HScroll from "./HScroll.js";

export default function CardList(
  title,
  items,
  basePath = "/playlists/details"
) {
  const CardItem = (item) => `
    <a 
      href="${basePath}/${item.slug || item.id}"
      data-navigo
      class="w-40 lg:h-60 lg:w-[220px] cursor-pointer shrink-0 block group"
    >
      <div class="relative">
        <img 
          src="${item.thumbnails || item.thumb}" 
          class="rounded-xl w-full h-40 lg:h-[220px] object-cover mb-2"
        />

        <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200">
            </div>

        <!-- Play icon  -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-100">
            <i class="fa-solid fa-play text-white text-4xl"></i>
        </div>
      </div>
      <h3 class="mb-2 text-white font-medium truncate">${
        item.title ?? item.name
      }</h3>
      ${
        item.albumType || item.artists?.length
          ? `<p class="text-gray-400 text-sm truncate">
        ${item.albumType ? item.albumType : ""}
        ${item.albumType && item.artists?.length ? " • " : ""}
        ${
          item.artists?.length
            ? item.artists
                .map((a) => (typeof a === "string" ? a : a.name))
                .join(", ")
            : ""
        }
      </p>`
          : ""
      }
    </a>
  `;

  const html = items.map(CardItem).join("");
  return Section(title, HScroll(html));
}
