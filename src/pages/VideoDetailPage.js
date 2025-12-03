import { videoPlayer } from "../controller/VideoPlayerController";
import VideoListPlayer from "../components/VideoListPlayer";
import InfoDetailsVideo from "../components/InfoDetailsVideo";

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
    popularity: v.popularity,
  }));

  const allVideos = [currentVideo, ...relatedVideos];
  const finalVideos = [...new Map(allVideos.map((t) => [t.id, t])).values()];

  videoPlayer.setVideos(finalVideos);
  videoPlayer.playVideoFromDetail(currentVideo.id);

  videoPlayer.updatePlayButton(true);
  videoPlayer.updateExpandedInfo();
  videoPlayer.renderRelatedList();
  videoPlayer.setupListEvents();
  videoPlayer.initExpandedVideoPlayer();

  const exp = document.querySelector("#video-player-expanded");
  exp?.classList.remove("hidden");
  setTimeout(() => exp?.classList.add("open"), 20);

  const html = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-12 md:px-8 lg:px-0 gap-x-4">
        <div class="lg:col-span-1">
          ${InfoDetailsVideo(currentVideo)}
        </div>

        <div id="video-detail-list" class="lg:col-span-1">
            ${VideoListPlayer(finalVideos)}
        </div>
      </div>
    `;

  setTimeout(() => {
    videoPlayer.setupExternalListEvents("#video-detail-list");
  });
  return html;
}
