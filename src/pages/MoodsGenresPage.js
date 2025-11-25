import CategoriesList from "../components/CategoriesList";

export default async function MoodsGenresPage(categories, lineSongs) {
  if (!categories.length)
    return "<p class='text-white p-4'>Không có dữ liệu</p>";

  const genres = categories.filter((item) => item.type === "genre");
  const moods = categories.filter(
    (item) => item.type === "mood" || item.type === "other"
  );

  return `
    <div class="p-4 text-white">
      <h1 class="font-bold text-[45px] mb-10">Tâm trạng và thể loại</h1>
      ${CategoriesList("Dành cho bạn", genres)}
      ${CategoriesList("Tâm trạng và khoảnh khắc", moods)}
      ${CategoriesList("Dòng nhạc", lineSongs, "/lines")}
    </div
  `;
}
