import CardList from "../components/CardList";
import VideosList from "../components/VideosList";

export default function NewReleasePage(releases, videos) {
  if (!releases.length && !videos.length)
    return "<p class='text-white p-4'>Không có dữ liệu</p>";

  return `
      <div class="p-4 text-white">
        <h1 class="font-bold text-[45px] -mb-10">Bản phát hành mới</h1>
        ${CardList("", releases, "/albums/details")}
        ${VideosList("Video nhạc mới", videos)}
      </div>

    `;
}
