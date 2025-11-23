import InfoDetails from "../components/InfoDetails";
import TrackList from "../components/Tracklist";

export default function AlbumPlaylistPage(data) {
  return `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-30 text-white px-4">
      <div class="md:col-span-1">
        ${InfoDetails(data)}
      </div>
      <div class="md:col-span-2">
        ${TrackList(data.tracks)}
      </div>
    </div>
  `;
}
