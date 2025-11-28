import InfoDetails from "../components/InfoDetails";
import TrackList from "../components/Tracklist";

export default function AlbumPlaylistPage(data) {
  return `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-12 md:px-8 lg:px-0 gap-x-4">
      <div class="lg:col-span-1">
        ${InfoDetails(data)}
      </div>
      <div class="lg:col-span-1">
        ${TrackList(data.tracks)}
      </div>
    </div>
  `;
}
