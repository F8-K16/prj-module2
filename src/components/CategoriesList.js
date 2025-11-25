import Section from "./Section.js";
import HScroll from "./HScroll.js";
import { splitToColumns } from "../utils/splitToColumns.js";

export default function CategoriesList(
  title,
  categories = [],
  basePath = "/categories"
) {
  function CategoryItem(item) {
    const url = item.path
      ? `${item.path}/${item.slug}`
      : `${basePath}/${item.slug}`;

    return `
      <a
        href="${url}"
        data-navigo
        class="h-12 rounded-lg flex items-center text-white  text-sm font-semibold cursor-pointer bg-[#292929]"
      >
        <div style="background-color: ${item.color};" class="h-full w-2 rounded-l-[999px] rounded-tr-[30px] rounded-br-[30px]"></div>
        <div class="w-full flex-1 flex items-center justify-center px-2 truncate">
          ${item.name}
        </div>
      </a>
    `;
  }

  function CategoryColumn(items) {
    return `
      <div class="flex flex-col shrink-0 w-40 md:w-48 lg:w-52 xl:w-61 gap-4">
        ${items.map(CategoryItem).join("")}
      </div>
    `;
  }

  const columns = splitToColumns(categories);

  const html = `
      ${columns.map(CategoryColumn).join("")}
  `;

  return Section(title, HScroll(html));
}
