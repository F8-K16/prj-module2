import HScroll from "./HScroll";

export default function TagList(tags, activeSlug = "") {
  const tagItem = (tag) => `
    <a 
      href="/moods/${tag.slug}" 
      data-navigo
      class="flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer
        ${
          tag.slug === activeSlug
            ? "bg-white text-black font-semibold"
            : "bg-white/10 text-white hover:bg-white/20"
        }
      "
    >
      ${tag.name}
    </a>
  `;

  const html = tags.map(tagItem).join("");
  return HScroll(html);
}
