import ExploreService from "../services/ExploreService";
import CardList from "../components/CardList";
import CategoriesList from "../components/CategoriesList";
import VideosList from "../components/VideosList";

export default async function ExplorePage() {
  const [albums, moodsGenres, videos] = await Promise.all([
    ExploreService.getAlbums(),
    ExploreService.getMoodsGenres(),
    ExploreService.getVideos(),
  ]);

  return `
      <div class="p-4 text-white">
        <section class="flex flex-col md:flex-row gap-4">
          <a href="/new-releases" data-navigo class="flex items-center gap-3 px-6 py-4 bg-white/10 rounded-xl text-md lg:text-lg xl:text-xl font-bold hover:bg-white/20 transition cursor-pointer w-full md:w-1/3">
            <i class="fa-solid fa-compact-disc text-2xl"></i>
            <span>Bản phát hành mới</span>
          </a>

          <a href="/charts" data-navigo class="flex items-center gap-3 px-6 py-4 bg-white/10 rounded-xl text-md lg:text-lg xl:text-xl font-bold hover:bg-white/20 transition cursor-pointer w-full md:w-1/3">
            <i class="fa-solid fa-chart-line text-2xl"></i>
            <span>Bảng xếp hạng</span>
          </a>

          <a href="/moods-and-genres" data-navigo class="flex items-center gap-3 px-6 py-4 bg-white/10 rounded-xl text-md lg:text-lg xl:text-xl font-bold hover:bg-white/20 transition cursor-pointer w-full md:w-1/3">
            <i class="fa-regular fa-face-smile text-2xl"></i>
            <span>Tâm trạng và thể loại</span>
          </a>

        </section>

        ${CardList("Khám phá Albums mới", albums, "/albums/details")}
        ${CategoriesList("Tâm trạng và thể loại", moodsGenres)}
        ${VideosList("Video nhạc mới", videos)}
      </div>

    `;
}
