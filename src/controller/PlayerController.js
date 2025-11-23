import { formatDuration } from "../utils/formatDuration";
import { UI } from "./UIController";

class PlayerController {
  constructor() {
    this.songs = [];
    this.currentIndex = 0;
    this.audio = new Audio();
    this.isShuffle = false;
    this.isRepeat = false;

    this.audio.onended = () => this.handleSongEnd();
  }

  setSongs(tracks) {
    this.songs = tracks;
  }

  loadSong(song) {
    if (!song) return;

    this.currentSong = song;
    this.currentIndex = this.songs.findIndex((s) => s.id === song.id);
    this.audio.src = song.audioUrl;
    this.audio.load();

    document.querySelector(
      "#player-thumbnail"
    ).style.backgroundImage = `url('${song.thumbnails?.[0]}')`;

    document.querySelector("#player-title").textContent = song.title;
    document.querySelector("#player-artist").textContent =
      song.artists?.[0] || "Không rõ nghệ sĩ";

    UI.highlightActiveSong(song.id);
    this.updatePlayButton(false);

    return new Promise((resolve) => {
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
  }

  async playSong() {
    try {
      await this.audio.play();
      this.updatePlayButton(true);
    } catch (error) {
      console.warn(error);
    }
    this.audio.play();
    this.updatePlayButton(true);
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

    this.currentIndex = (this.currentIndex + 1) % this.songs.length;

    await this.loadSong(this.songs[this.currentIndex]);
    this.playSong();
  }

  async prevSong() {
    if (!this.songs.length) return;

    this.currentIndex =
      (this.currentIndex - 1 + this.songs.length) % this.songs.length;

    await this.loadSong(this.songs[this.currentIndex]);
    this.playSong();
  }

  async playRandomSong() {
    if (!this.songs.length) return;

    let random;
    do {
      random = Math.floor(Math.random() * this.songs.length);
    } while (random === this.currentIndex);

    this.currentIndex = random;

    await this.loadSong(this.songs[random]);
    this.playSong();
  }

  setVolume(val) {
    this.audio.volume = val / 100;
    const icon = document.querySelectorAll(
      "#player-volume i, #player-volume-mb i"
    );

    icon.forEach((el) => {
      if (this.audio.volume === 0)
        el.className = "fa-solid fa-volume-xmark text-xl";
      else if (this.audio.volume <= 0.5)
        el.className = "fa-solid fa-volume-low text-xl";
      else el.className = "fa-solid fa-volume-high text-xl";
    });
  }

  toggleMute() {
    const sliders = document.querySelectorAll(
      "#player-volume-slider, #player-volume-slider-mb"
    );
    const icons = document.querySelectorAll(
      "#player-volume i, #player-volume-mb i"
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

  initProgressBar() {
    const progress = document.querySelector("#player-progress-bar");
    const currentEl = document.querySelector("#player-current");

    this.audio.addEventListener("timeupdate", () => {
      const duration = this.audio.duration;
      if (!duration || isNaN(duration)) return;

      progress.value = (this.audio.currentTime / duration) * 100;
      currentEl.textContent = formatDuration(this.audio.currentTime);
    });
  }

  updatePlayButton(isPlaying) {
    const icon = document.querySelector("#player-play-btn i");
    icon.className = isPlaying
      ? "fa-solid fa-pause text-3xl"
      : "fa-solid fa-play text-3xl";
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    if (this.isShuffle) this.isRepeat = false;
    ["#player-shuffle-btn", "#player-shuffle-btn-mb"].forEach((id) =>
      document.querySelector(id)?.classList.toggle("active", this.isShuffle)
    );
    ["#player-repeat-btn", "#player-repeat-btn-mb"].forEach((id) =>
      document.querySelector(id)?.classList.toggle("active", this.isRepeat)
    );
  }

  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
    if (this.isRepeat) this.isShuffle = false;
    ["#player-repeat-btn", "#player-repeat-btn-mb"].forEach((id) =>
      document.querySelector(id)?.classList.toggle("active", this.isRepeat)
    );
    ["#player-shuffle-btn", "#player-shuffle-btn-mb"].forEach((id) =>
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
        menu.classList.remove("hidden");
        menu.classList.add("flex");
      });
      document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !btn.contains(e.target))
          menu.classList.add("hidden");
      });
    };

    toggleMenu("#mobile-options-btn", "#mobile-options-menu");
    toggleMenu("#mobile-right-toggle", "#mobile-right-menu");
  }

  initTrackClick() {
    document.addEventListener("click", (e) => {
      const item = e.target.closest(".track-item");
      if (!item) return;
      const trackId = item.dataset.trackId;
      const song = player.songs.find((s) => s.id === trackId);

      if (!song) return;
      player.loadSong(song);
      player.playSong();

      document.querySelector("#player-wrapper").classList.remove("hidden");
    });
  }

  addListener = (selector, event, handler) => {
    document
      .querySelectorAll(selector)
      .forEach((el) => el.addEventListener(event, handler));
  };

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.initProgressBar();
    this.initTrackClick();
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

export const player = new PlayerController();
