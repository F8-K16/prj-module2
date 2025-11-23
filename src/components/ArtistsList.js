import Section from "./Section.js";
import HScroll from "./HScroll.js";
import { splitToColumns } from "../utils/splitToColumns.js";
import { formatViews } from "../utils/formatViews.js";

export default function ArtistsList(title, items = []) {
  function TrendIcon(trend) {
    if (!trend) return "";
    if (trend === "up") {
      return `<span class="text-green-400 text-sm ml-1">▲</span>`;
    }
    if (trend === "down") {
      return `<span class="text-red-400 text-sm ml-1">▼</span>`;
    }
    return "";
  }

  function ListItem(item) {
    return `
      <a
        href="/artist/${item.artistId}"
        data-navigo
        class="flex items-center gap-8 py-3 hover:bg-white/5 rounded-lg transition cursor-pointer px-2"
      >
        <div class="flex gap-2 items-center text-2xl font-bold text-gray-300 w-10 text-center">
          ${item.rank}
          ${TrendIcon(item.trend)}
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-1">
            <h3 class="text-white font-semibold truncate">${item.name}</h3>
            
          </div>

          <p class="text-gray-400 text-xs">
            ${formatViews(item.totalViews)} views
          </p>
        </div>
      </a>
    `;
  }

  function ListColumn(items) {
    return `
      <div class="flex flex-col gap-3 shrink-0 min-w-[33%] -mb-6">
        ${items.map(ListItem).join("")}
      </div>
    `;
  }

  const columns = splitToColumns(items);
  const colHtml = columns.map(ListColumn).join("");

  return Section(title, HScroll(colHtml));
}
