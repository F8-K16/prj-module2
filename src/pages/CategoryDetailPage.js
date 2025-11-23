import CardList from "../components/CardList";

export default function CategoryDetailPage(c) {
  return `
    <div class="p-4 text-white">
      <h1 class="font-bold text-[45px] mb-10">${c.name}</h1>
      ${c.subcategories
        .map((sub) => CardList(sub.name, sub.playlists))
        .join("")}
    </div>
  `;
}
