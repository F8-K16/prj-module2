import InfoDetailsVideo from "../components/InfoDetailsVideo";
import VideoListPlayer from "../components/VideoListPlayer";
import { playerVideo } from "../controller/VideoPlayerController";

export default function VideoDetailPage(data) {
  const currentVideo = {
    id: data.id,
    title: data.title,
    thumbnails: data.thumbnails,
    duration: data.duration,
    popularity: data.popularity,
    videoId: data.videoId,
  };

  const relatedVideos = (data.related || []).map((v) => ({
    id: v.id,
    title: v.title,
    thumbnails: v.thumbnails,
    duration: v.duration,
    videoId: v.videoId,
  }));

  const allVideos = [currentVideo, ...relatedVideos];
  playerVideo.setVideos(allVideos);

  return `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-12 md:px-8 lg:px-0 gap-x-4">
        <div class="lg:col-span-1">
          ${InfoDetailsVideo(currentVideo)}
        </div>

        <div class="lg:col-span-1">
            ${VideoListPlayer(allVideos)}
        </div>
      </div>
    `;
}
