import QuickPicksList from "../components/QuickPicksList";
import CardList from "../components/CardList";
import VideosList from "../components/VideosList";

export default function SearchResultsPage(keyword, data) {
  if (!data) {
    return `
      <div class="text-gray-400 p-4">
        Không thể tải kết quả tìm kiếm cho: <b>${keyword}</b>
      </div>
    `;
  }

  const { completed = [] } = data;

  const songs = completed.filter((i) => i.type === "song");
  const albums = completed.filter((i) => i.type === "album");
  const playlists = completed.filter((i) => i.type === "playlist");
  const videos = completed.filter((i) => i.type === "video");

  return `
    <div class="p-3">
      <h2 class="text-2xl text-white font-semibold mb-6">
        Kết quả cho "${keyword}"
      </h2>

      ${songs.length ? QuickPicksList("Bài hát", songs) : ""}

      ${albums.length ? CardList("Albums", albums, "/albums/details") : ""}

      ${
        playlists.length
          ? CardList("Playlists", playlists, "/playlists/details")
          : ""
      }

      ${videos.length ? VideosList("Videos", videos) : ""}

      ${
        !songs.length && !albums.length && !playlists.length && !videos.length
          ? `<p class="text-gray-400 p-2">Không tìm thấy kết quả phù hợp.</p>`
          : ""
      }
    </div>
  `;
}
