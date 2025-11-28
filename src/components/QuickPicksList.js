import Section from "./Section.js";
import HScroll from "./HScroll.js";
import { splitToColumns } from "../utils/splitToColumns.js";
import { formatViews } from "../utils/formatViews.js";

export default function QuickPicksList(title, items = []) {
  function ListItem(item) {
    const type = item.type;
    let path = "songs/details";

    if (type === "album") path = "/albums/details";
    if (type === "playlist") path = "/playlists/details";

    const image =
      Array.isArray(item.thumbnails) && item.thumbnails.length > 0
        ? item.thumbnails[0]
        : item.thumb;

    const hasArtists = Array.isArray(item.artists) && item.artists.length > 0;

    const subtitle = hasArtists
      ? item.artists[0]
      : `
    <span>${formatViews(item.views) ?? 0} lượt xem</span>
    <span class="ml-2">•</span>
    <span>${item.albumName ?? ""}</span>
  `;

    return `
        <a
        href="${path}/${item.id ?? item.slug}"
        data-navigo
        class="flex items-center gap-4 py-2 px-3 hover:bg-white/5 rounded-lg transition cursor-pointer group">
        <div class="relative overflow-hidden rounded">
          <img 
            src="${image}" 
            class="w-12 h-12 rounded object-cover transition duration-200 group-hover:brightness-50"
          />

          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-200"></div>

          <!-- Play icon -->
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
            <i class="fa-solid fa-play text-white text-sm"></i>
          </div>
        </div>

      <div class="flex flex-col gap-1">
        <h3 class="text-white font-medium truncate">${
          item.title || item.name
        }</h3>
       <div class="flex items-center text-gray-400 truncate">
          <span>${subtitle}</span> 
          ${
            item.popularity
              ? `<span class="mx-2">•</span> 
                 <span>${formatViews(item.popularity)} lượt nghe</span>`
              : ``
          }
       </div>
      </div>
    </a>
    `;
  }

  function ListColumn(items) {
    return `
      <div class="flex flex-col gap-3 shrink-0 min-w-[33.33%] -mb-6">
        ${items.map(ListItem).join("")}
      </div>
    `;
  }

  const columns = splitToColumns(items);
  const colHtml = columns.map(ListColumn).join("");

  return Section(title, HScroll(colHtml));
}
