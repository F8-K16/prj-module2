import InfoDetails from "../components/InfoDetails";
import SongListPlayer from "../components/SongListPlayer";
import { player } from "../controller/PlayerController";

export default function SongDetailPage(data) {
  const infoPayload = {
    thumbnails: data.thumbnails,
    title: data.title,
  };

  const albumTracks = data.album?.tracks || [];
  const playlistTracks =
    data.playlists?.flatMap((p) => p.tracks || []).slice(0, 95) || [];

  const mixTracks = [...albumTracks, ...playlistTracks];
  const relatedTracks = data.related || [];

  const finalTracks = mixTracks.length > 0 ? mixTracks : relatedTracks;

  const mergedTracks = finalTracks.map((t) => ({
    id: t.id,
    title: t.title,
    thumbnails: t.thumbnails || data.thumbnails || [],
    duration: t.duration || 0,
    audioUrl: t.audioUrl,
    audioType: t.audioType,
    artists: t.artists || ["Không rõ nghệ sĩ"],
  }));

  player.setSongs(mergedTracks);

  return `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-30">
      <div class="md:col-span-1">
        ${InfoDetails(infoPayload)}
      </div>

      <div class="md:col-span-2">
        ${SongListPlayer(mergedTracks)}
      </div>

    </div>
  `;
}
