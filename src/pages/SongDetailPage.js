import InfoDetails from "../components/InfoDetails";
import SongListPlayer from "../components/SongListPlayer";
import { player } from "../controller/PlayerController";

export default function SongDetailPage(data) {
  const currentSong = {
    id: data.id,
    audioUrl: data.audioUrl,
    thumbnails: data.thumbnails,
    title: data.title,
    duration: data.duration,
    popularity: data.popularity,
  };

  const albumTracks = data.album?.tracks || [];
  const playlistTracks =
    data.playlists?.flatMap((p) => p.tracks || []).slice(0, 45) || [];

  const mixTracks = [...albumTracks, ...playlistTracks];
  const relatedTracks = data.related || [];

  const finalTracks = mixTracks.length > 0 ? mixTracks : relatedTracks;

  const mergedTracks = finalTracks.map((t) => ({
    id: t.id,
    title: t.title,
    thumbnails: t.thumbnails || [],
    duration: t.duration || 0,
    audioUrl: t.audioUrl,
    audioType: t.audioType,
    artists: t.artists || ["Không rõ nghệ sĩ"],
  }));

  player.setSongs([
    ...new Map([currentSong, ...mergedTracks].map((s) => [s.id, s])).values(),
  ]);

  return `
    <div class=" grid grid-cols-1 lg:grid-cols-2 gap-y-12 md:px-8 lg:px-0 gap-x-4">
      <div id="info-details-box" class="lg:col-span-1">
        ${InfoDetails(currentSong)}
      </div>

      <div class="lg:col-span-1">
        ${SongListPlayer(mergedTracks)}
      </div>

    </div>
  `;
}
