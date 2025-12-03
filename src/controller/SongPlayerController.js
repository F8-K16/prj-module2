import { formatDuration } from "../utils/formatDuration";
import { loading } from "../utils/loading";

class SongPlayerController {
  constructor() {
    this.songs = [];
    this.currentIndex = 0;
    this.audio = new Audio();
    this.audio.preload = "auto";

    this.isShuffle = false;
    this.isRepeat = false;
    this.playPromise = null;
    this.isLoading = false;

    this._trackClickReady = false;

    this.onTimeUpdate = this.onTimeUpdate.bind(this);

    this.audio.onended = () => this.handleSongEnd();
  }

  setSongs(tracks) {
    this.songs = Array.isArray(tracks) ? tracks : [];
    this.setupListEvents();
  }

  async loadSong(song) {
    if (!song) return;

    try {
      this.isLoading = true;
      loading.show();
      if (this.playPromise) {
        try {
          this.audio.pause();
        } catch {}
        this.playPromise = null;
      }

      this.currentSong = song;
      this.currentIndex = this.songs.findIndex((s) => s.id === song.id);

      this.audio.src = song.audioUrl;
      this.audio.load();

      document.querySelector(
        "#player-thumbnail"
      ).style.backgroundImage = `url('${song?.thumbnails?.[0]}')`;

      document.querySelector("#player-title").textContent = song.title;
      document.querySelector("#player-artist").textContent =
        song.artists?.[0] || "Không rõ nghệ sĩ";

      this.highlightActiveSong(song.id);
      this.updatePlayButton(false);

      await new Promise((resolve) => {
        this.audio.addEventListener(
          "loadedmetadata",
          () => {
            document.querySelector("#player-duration").textContent =
              formatDuration(this.audio.duration);
            resolve();
          },
          { once: true }
        );
      });
      this.updateInfoDetails(song);
      this.updateExpandedInfo();
    } finally {
      this.isLoading = false;
      loading.hide();
    }
  }

  async playSong() {
    if (this.isLoading) return;
    try {
      if (this.playPromise) {
        try {
          await this.playPromise;
        } catch (error) {
          console.warn("Không thể play:", error);
        }
      }

      this.playPromise = this.audio.play();
      await this.playPromise;

      this.updatePlayButton(true);
    } catch (error) {
      console.warn("Lỗi phát nhạc:", error);
    }
  }

  pauseSong() {
    this.audio.pause();
    this.updatePlayButton(false);
  }

  togglePlay() {
    this.audio.paused ? this.playSong() : this.pauseSong();
  }

  async nextSong() {
    if (!this.songs.length) return;

    if (this.isRepeat) {
      await this.loadSong(this.currentSong);
      return this.playSong();
    }

    if (this.isShuffle) {
      return this.playRandomSong();
    }

    this.currentIndex = (this.currentIndex + 1) % this.songs.length;
    const nextTrack = this.songs[this.currentIndex];

    await this.loadSong(nextTrack);
    this.playSong();
  }

  async prevSong() {
    if (!this.songs.length) return;

    if (this.isRepeat) {
      await this.loadSong(this.currentSong);
      return this.playSong();
    }

    if (this.isShuffle) {
      return this.playRandomSong();
    }

    this.currentIndex =
      (this.currentIndex - 1 + this.songs.length) % this.songs.length;

    const prevTrack = this.songs[this.currentIndex];
    await this.loadSong(prevTrack);
    this.playSong();
  }

  async playRandomSong() {
    if (!this.songs.length) return;

    let random;
    do {
      random = Math.floor(Math.random() * this.songs.length);
    } while (random === this.currentIndex);
    this.currentIndex = random;
    const song = this.songs[random];

    await this.loadSong(song);
    this.playSong();
  }

  setVolume(val) {
    this.audio.volume = val / 100;

    const icons = document.querySelectorAll(
      "#player-volume i, #player-volume-mb i, #exp-volume-btn i"
    );

    const sliderList = document.querySelectorAll(
      "#player-volume-slider, #player-volume-slider-mb, #exp-volume-slider"
    );

    sliderList.forEach((s) => (s.value = val));

    icons.forEach((el) => {
      if (this.audio.volume === 0)
        el.className = "fa-solid fa-volume-xmark text-xl";
      else if (this.audio.volume <= 0.5)
        el.className = "fa-solid fa-volume-low text-xl";
      else el.className = "fa-solid fa-volume-high text-xl";
    });
  }

  toggleMute() {
    const icons = document.querySelectorAll(
      "#player-volume i, #player-volume-mb i, #exp-volume-btn i"
    );

    const sliders = document.querySelectorAll(
      "#player-volume-slider, #player-volume-slider-mb, #exp-volume-slider"
    );

    if (this.audio.volume > 0) {
      this.lastVolume = this.audio.volume;
      this.audio.volume = 0;
    } else {
      this.audio.volume = this.lastVolume || 0.5;
    }

    sliders.forEach((s) => (s.value = this.audio.volume * 100));

    icons.forEach((icon) => {
      if (this.audio.volume === 0)
        icon.className = "fa-solid fa-volume-xmark text-xl";
      else if (this.audio.volume <= 0.5)
        icon.className = "fa-solid fa-volume-low text-xl";
      else icon.className = "fa-solid fa-volume-high text-xl";
    });
  }

  onProgressChange(val) {
    const duration = this.audio.duration;
    if (!duration || isNaN(duration)) return;

    this.audio.currentTime = (val / 100) * duration;
  }

  onTimeUpdate() {
    const progress = document.querySelector("#player-progress-bar");
    const currentEl = document.querySelector("#player-current");
    const expProgress = document.querySelector("#exp-progress");
    const expCurrent = document.querySelector("#exp-current");
    const duration = this.audio.duration;

    if (!duration || isNaN(duration)) return;

    if (progress) progress.value = (this.audio.currentTime / duration) * 100;

    if (currentEl)
      currentEl.textContent = formatDuration(this.audio.currentTime);

    if (expProgress)
      expProgress.value = (this.audio.currentTime / duration) * 100;

    if (expCurrent)
      expCurrent.textContent = formatDuration(this.audio.currentTime);
  }

  initProgressBar() {
    this.audio.removeEventListener("timeupdate", this.onTimeUpdate);
    this.audio.addEventListener("timeupdate", this.onTimeUpdate);
  }

  updatePlayButton(isPlaying) {
    ["#player-play-btn i", "#exp-play-btn i"].forEach((selector) => {
      const icon = document.querySelector(selector);
      if (!icon) return;

      icon.className = isPlaying
        ? "fa-solid fa-pause text-3xl"
        : "fa-solid fa-play text-3xl";
    });
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    if (this.isShuffle) this.isRepeat = false;
    [
      "#player-shuffle-btn",
      "#player-shuffle-btn-mb",
      "#exp-shuffle-btn",
    ].forEach((id) =>
      document.querySelector(id)?.classList.toggle("active", this.isShuffle)
    );
    ["#player-repeat-btn", "#player-repeat-btn-mb", "#exp-repeat-btn"].forEach(
      (id) =>
        document.querySelector(id)?.classList.toggle("active", this.isRepeat)
    );
  }

  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
    if (this.isRepeat) this.isShuffle = false;
    ["#player-repeat-btn", "#player-repeat-btn-mb", "#exp-repeat-btn"].forEach(
      (id) =>
        document.querySelector(id)?.classList.toggle("active", this.isRepeat)
    );
    [
      "#player-shuffle-btn",
      "#player-shuffle-btn-mb",
      "#exp-shuffle-btn",
    ].forEach((id) =>
      document.querySelector(id)?.classList.toggle("active", this.isShuffle)
    );
  }

  handleSongEnd() {
    if (this.isRepeat) {
      this.playSong();
    } else if (this.isShuffle) {
      this.playRandomSong();
    } else {
      this.nextSong();
    }
  }

  toggleMobileControl() {
    const toggleMenu = (btnSelector, menuSelector) => {
      const btn = document.querySelector(btnSelector);
      const menu = document.querySelector(menuSelector);

      if (!btn || !menu) return;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("hidden");
      });
      document.addEventListener("click", (e) => {
        const clickedOutside = !menu.contains(e.target) && e.target !== btn;

        if (clickedOutside) {
          menu.classList.add("hidden");
        }
      });
    };

    toggleMenu("#mobile-options-btn", "#mobile-options-menu");
    toggleMenu("#mobile-right-toggle", "#mobile-right-menu");
  }

  updateInfoDetails(song) {
    const infoBox = document.querySelector("#info-details-box");
    if (!infoBox) return;

    const thumbEl = document.querySelector("#song-thumb-display");
    const titleEl = document.querySelector("#song-title-display");
    const durationEl = document.querySelector("#song-duration-display");
    const popularityEl = document.querySelector("#song-popularity-display");

    thumbEl.src = song.thumbnails?.[0] || "";

    titleEl.textContent = song.title || "Không có tiêu đề";

    durationEl.textContent = song.duration
      ? `Thời lượng: ${formatDuration(song.duration)}`
      : "";

    popularityEl.textContent = song.popularity
      ? `${song.popularity} lượt nghe`
      : "";
  }

  setupListEvents() {
    if (this._trackClickReady) return;
    this._trackClickReady = true;

    document.addEventListener("click", async (e) => {
      const item = e.target.closest(".track-item");
      if (!item) return;

      const trackId = item.dataset.trackId;
      const song = this.songs.find((s) => s.id === trackId);
      if (!song) return;

      await this.loadSong(song);
      await this.playSong();

      this.updateInfoDetails(song);
      document.querySelector("#player-wrapper").classList.remove("hidden");

      this.highlightActiveSong(trackId);
    });
  }

  async playSongFromDetail(id) {
    const song = this.songs.find((s) => s.id === id);
    if (!song) return;

    await this.loadSong(song);
    await this.playSong();

    document.querySelector("#player-wrapper").classList.remove("hidden");
    this.highlightActiveSong(id);
  }

  highlightActiveSong(id) {
    if (!id) return;
    document.querySelectorAll(".playing").forEach((el) => {
      el.classList.remove("playing");
    });

    const tracks = document.querySelectorAll(
      `.track-item[data-track-id="${id}"]`
    );
    tracks.forEach((el) => {
      el.classList.add("playing");
      setTimeout(() => {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
    });
  }

  updateExpandedInfo() {
    if (!this.currentSong) return;
    const s = this.currentSong;

    document.querySelector("#exp-thumb").src = s.thumbnails?.[0] || "";
    document.querySelector("#exp-title").textContent = s.title;
    document.querySelector("#exp-artist").textContent = s.artists?.[0] || "";

    document.querySelector("#exp-duration").textContent = formatDuration(
      this.audio.duration
    );
  }

  renderRelatedList() {
    const box = document.querySelector("#exp-related-list");
    if (!box) return;

    box.innerHTML = this.songs
      .map(
        (t) => `
      <div class="track-item flex items-center gap-4 p-3 rounded-lg text-white hover:bg-white/10 cursor-pointer transition group"
           data-track-id="${t.id}">
        <div class="relative">
          <img src="${
            t.thumbnails?.[0]
          }" class="w-12 h-12 rounded-lg object-cover" />

          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-200"></div>

          <!-- Play icon -->
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
              <i class="fa-solid fa-play text-white text-sm"></i>
          </div>
        </div>
        <div class="flex flex-col flex-1">
              <div class="font-semibold">${t.title}</div>
              <div class="text-sm text-white/60">${
                t?.artists[0] || "Không rõ nghệ sĩ"
              }</div>
            </div>

            <div class="text-sm text-white/50">${formatDuration(
              t.duration
            )}</div>
        </div>
    `
      )
      .join("");

    if (this.currentSong) {
      this.highlightActiveSong(this.currentSong.id);
    }
  }

  initExpandedPlayer() {
    const miniPlayer = document.querySelector("#player-wrapper");
    const expanded = document.querySelector("#player-expanded");

    miniPlayer.addEventListener("click", (e) => {
      if (e.target.closest(".player-act")) return;
      if (e.target.id === "player-progress-bar") return;

      expanded.classList.remove("hidden");
      setTimeout(() => expanded.classList.add("open"));
      miniPlayer.classList.add("hidden");

      this.updateExpandedInfo();
      this.renderRelatedList();
    });

    document
      .querySelector("#player-expanded-close")
      .addEventListener("click", () => {
        expanded.classList.remove("open");
        setTimeout(() => expanded.classList.add("hidden"), 300);
        miniPlayer.classList.remove("hidden");
      });

    document
      .querySelector("#exp-play-btn")
      .addEventListener("click", () => this.togglePlay());
    document
      .querySelector("#exp-next-btn")
      .addEventListener("click", () => this.nextSong());
    document
      .querySelector("#exp-prev-btn")
      .addEventListener("click", () => this.prevSong());

    document
      .querySelector("#exp-progress")
      .addEventListener("input", (e) => this.onProgressChange(e.target.value));

    this.addListener("#exp-volume-slider", "input", (e) =>
      this.setVolume(e.target.value)
    );
    this.addListener("#exp-volume-btn", "click", () => this.toggleMute());

    this.addListener("#exp-shuffle-btn", "click", () => this.toggleShuffle());
    this.addListener("#exp-repeat-btn", "click", () => this.toggleRepeat());
  }

  destroy() {
    this.audio?.pause();
    this.currentSong = null;

    document.querySelector("#player-wrapper")?.classList.add("hidden");
    document.querySelector("#player-expanded")?.classList.add("hidden");

    clearInterval(this._trackingTimer);
  }

  addListener = (selector, event, handler) => {
    document
      .querySelectorAll(selector)
      .forEach((el) => el.addEventListener(event, handler));
  };

  init() {
    this.initProgressBar();
    this.initExpandedPlayer();
    this.addListener("#player-play-btn", "click", () => this.togglePlay());
    this.addListener("#player-next-btn", "click", () => this.nextSong());
    this.addListener("#player-prev-btn", "click", () => this.prevSong());

    this.addListener("#player-volume-slider", "input", (e) =>
      this.setVolume(e.target.value)
    );
    this.addListener("#player-volume-slider-mb", "input", (e) =>
      this.setVolume(e.target.value)
    );
    this.addListener("#player-volume", "click", () => this.toggleMute());
    this.addListener("#player-volume-mb", "click", () => this.toggleMute());

    this.addListener("#player-shuffle-btn", "click", () =>
      this.toggleShuffle()
    );
    this.addListener("#player-shuffle-btn-mb", "click", () =>
      this.toggleShuffle()
    );
    this.addListener("#player-repeat-btn", "click", () => this.toggleRepeat());
    this.addListener("#player-repeat-btn-mb", "click", () =>
      this.toggleRepeat()
    );

    this.addListener("#player-progress-bar", "input", (e) =>
      this.onProgressChange(e.target.value)
    );

    this.toggleMobileControl();
  }
}

export const songPlayer = new SongPlayerController();
