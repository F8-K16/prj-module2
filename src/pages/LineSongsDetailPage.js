import QuickPicksList from "../components/QuickPicksList";
import CardList from "../components/CardList";
import VideosList from "../components/VideosList";

export default function LineSongsDetailPage(songs, playlists, videos, albums) {
  return `
    <div class="p-4 text-white">
        ${QuickPicksList("Bài hát", songs)}
        ${CardList("Danh sách phát nổi bật", playlists)}
        ${VideosList("Video nhạc", videos)}
        ${CardList("Đĩa nhạc", albums, "/albums/details")}
    </div>  
  `;
}
