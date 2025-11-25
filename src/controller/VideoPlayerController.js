import { formatVideoDuration } from "../utils/formatDuration";

class PlayerVideoController {
  constructor() {
    this.videos = [];
    this.currentVideo = null;
    this._eventsBound = false;
  }

  setVideos(videos = []) {
    this.videos = videos;
    if (!this._eventsBound) {
      this.setupListEvents();
      this._eventsBound = true;
    }
  }

  setupListEvents() {
    document.addEventListener("click", (e) => {
      const item = e.target.closest(".video-item");

      if (!item) return;
      const id = item.dataset.videoId;
      const video = this.videos.find((v) => v.id === id);

      if (video) {
        this.play(video);
        this.highlightActiveVideo(id);
      }
    });
  }

  play(video) {
    this.currentVideo = video;

    const iframe = document.querySelector("#video-iframe-display");
    const titleEl = document.querySelector("#video-title-display");
    const durationEl = document.querySelector("#video-duration-display");
    const popularityEl = document.querySelector("#video-popularity-display");

    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1`;
    }

    if (titleEl) titleEl.textContent = video.title;

    if (durationEl)
      durationEl.textContent = `Thời lượng: ${formatVideoDuration(
        video.duration
      )}`;

    if (popularityEl) {
      if (video.popularity) {
        popularityEl.classList.remove("hidden");
        popularityEl.textContent = `${video.popularity} lượt xem`;
      } else {
        popularityEl.classList.add("hidden");
      }
    }
  }

  playVideoFromDetail(id) {
    const video = this.videos.find((v) => v.id === id);
    if (!video) return;
    this.play(video);

    this.highlightActiveVideo(id);
  }

  highlightActiveVideo(id) {
    const prev = document.querySelector(".video-item.playing");
    if (prev) prev.classList.remove("playing");
    const el = document.querySelector(`.video-item[data-video-id="${id}"]`);
    if (el) el.classList.add("playing");
  }
}

export const playerVideo = new PlayerVideoController();
