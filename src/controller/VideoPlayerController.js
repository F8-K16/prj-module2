import { formatDuration, formatVideoDuration } from "../utils/formatDuration";

class PlayerVideoController {
  constructor() {
    this.videos = [];
    this.currentIndex = 0;
    this.currentVideo = null;

    this.player = null;
    this.isReady = false;

    this._pendingVideo = null;

    this.isShuffle = false;
    this.isRepeat = false;

    this._eventsBound = false;

    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);

    this.apiReady = false;
    if (window.YT && window.YT.Player) {
      this.apiReady = true;
    }
  }

  onYouTubeAPIReady() {
    this.apiReady = true;

    if (this._pendingVideo) {
      this.play(this._pendingVideo);
      this._pendingVideo = null;
    }
  }

  setVideos(videos = []) {
    this.videos = videos;
  }

  setupListEvents() {
    if (this._eventsBound) return;
    this._eventsBound = true;
    document
      .querySelector("#video-exp-related-list")
      ?.addEventListener("click", (e) => {
        const item = e.target.closest(".video-item");
        if (!item) return;

        const id = item.dataset.videoId;

        const video = this.videos.find((v) => String(v.id) === String(id));
        if (!video) return;

        this.play(video);
        this.highlightActiveVideo(id);
      });
  }

  setupExternalListEvents(containerSelector = "#video-detail-list") {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.addEventListener("click", (e) => {
      const item = e.target.closest(".video-item");
      if (!item) return;

      const id = item.dataset.videoId;
      const video = this.videos.find((v) => String(v.id) === String(id));
      if (!video) return;

      this.play(video);
      this.highlightActiveVideo(id);
    });
  }

  highlightActiveVideo(id) {
    if (!id) return;
    document.querySelectorAll(".playing").forEach((el) => {
      el.classList.remove("playing");
    });

    const videos = document.querySelectorAll(
      `.video-item[data-video-id="${id}"]`
    );
    videos.forEach((el) => {
      el.classList.add("playing");
      setTimeout(() => {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
    });
  }

  async initYouTubePlayer() {
    if (this.player) return;

    await new Promise((resolve) => {
      requestAnimationFrame(() => resolve());
    });

    this.player = new YT.Player("video-iframe-display", {
      height: "100%",
      width: "100%",
      videoId: this.currentVideo?.videoId,
      playerVars: { autoplay: 1, controls: 0 },
      events: {
        onReady: (e) => {
          this.player = e.target;
          this.isReady = true;
        },
        onStateChange: this.onPlayerStateChange,
      },
    });

    await new Promise((resolve) => {
      const checkReady = () => {
        if (this.isReady) resolve();
        else setTimeout(checkReady, 50);
      };
      checkReady();
    });
  }

  async play(video) {
    if (!this.apiReady) {
      this._pendingVideo = video;
      return;
    }

    this.currentVideo = video;

    this.currentIndex = this.videos.findIndex((v) => v.id === video.id);

    if (!this.player) {
      await this.initYouTubePlayer();
    }
    this.player.loadVideoById(video.videoId);

    this.updatePlayerUI(video);
    this.updateExpandedInfo();
    this.updatePlayButton(true);
    this.highlightActiveVideo(video.id);
    this.initVideoPlayer();
    this.initExpandedVideoPlayer();

    document.querySelector("#video-player-wrapper").classList.remove("hidden");
  }

  async playVideoFromDetail(id) {
    const video = this.videos.find((v) => v.id === id);
    if (!video) return;

    this.currentVideo = video;
    this.currentIndex = this.videos.findIndex((v) => v.id === id);

    if (!this.player) {
      await this.initYouTubePlayer();
    }

    document.querySelector("#video-player-wrapper")?.classList.remove("hidden");
    this.play(video);
    this.highlightActiveVideo(id);
  }

  updatePlayerUI(video) {
    document.querySelector("#video-player-title").textContent = video.title;
    document.querySelector("#video-player-artist").textContent =
      video.channelTitle || "Không rõ";
    document.querySelector(
      "#video-player-thumbnail"
    ).style.backgroundImage = `url('${video.thumbnails?.[0]}')`;
  }

  startTrackingProgress() {
    if (this._progressTimer) clearInterval(this._progressTimer);

    this._progressTimer = setInterval(() => {
      if (!this.player || !this.isReady) return;

      const current = this.player.getCurrentTime();
      const duration = this.player.getDuration();
      const percent = (current / duration) * 100;

      document.querySelector("#video-player-current").textContent =
        formatDuration(current);
      document.querySelector("#video-player-duration").textContent =
        formatDuration(duration);
      document.querySelector("#video-player-progress-bar").value = percent;
      document.querySelector("#video-exp-current").textContent =
        formatDuration(current);
      document.querySelector("#video-exp-duration").textContent =
        formatDuration(duration);
      document.querySelector("#video-exp-progress").value = percent;
    }, 300);
  }

  togglePlay() {
    if (!this.isReady) return;
    const state = this.player.getPlayerState();
    if (state === 1) {
      this.player.pauseVideo();
      this.updatePlayButton(false);
    } else {
      this.player.playVideo();
      this.updatePlayButton(true);
    }
  }

  updatePlayButton(isPlaying) {
    ["#video-player-play-btn i", "#video-exp-play-btn i"].forEach(
      (selector) => {
        const icon = document.querySelector(selector);
        if (!icon) return;

        icon.className = isPlaying
          ? "fa-solid fa-pause text-3xl"
          : "fa-solid fa-play text-3xl";
      }
    );
  }

  nextVideo() {
    if (!this.videos.length) return;
    if (this.isRepeat) {
      this.play(this.currentVideo);
      return;
    }

    if (this.isShuffle) {
      this.playRandomVideo();
      return;
    }
    if (this.isShuffle) return this.playRandomVideo();
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
    this.play(this.videos[this.currentIndex]);
  }

  prevVideo() {
    if (!this.videos.length) return;
    if (this.isRepeat) {
      this.play(this.currentVideo);
      return;
    }

    if (this.isShuffle) {
      this.playRandomVideo();
      return;
    }
    this.currentIndex =
      (this.currentIndex - 1 + this.videos.length) % this.videos.length;
    this.play(this.videos[this.currentIndex]);
  }

  playRandomVideo() {
    if (!this.videos.length) return;
    let random;
    do {
      random = Math.floor(Math.random() * this.videos.length);
    } while (random === this.currentIndex);
    this.currentIndex = random;
    this.play(this.videos[random]);
  }

  setVolume(val) {
    if (!this.player || !this.isReady) return;

    val = Number(val);
    this.player.setVolume(val);
    this.lastVolume = val > 0 ? val : this.lastVolume;

    const sliderList = document.querySelectorAll(
      "#video-player-volume-slider, #video-player-volume-slider-mb, #video-exp-volume-slider"
    );
    sliderList.forEach((s) => (s.value = val));

    this.updateVolumeIcon(val);
  }

  toggleMute() {
    if (!this.player || !this.isReady) return;

    let volume = this.player.getVolume();

    if (volume > 0) {
      this.lastVolume = volume;
      this.player.setVolume(0);
      volume = 0;
    } else {
      const restore = this.lastVolume ?? 50;
      this.player.setVolume(restore);
      volume = restore;
    }
    this.updateVolumeIcon(volume);

    document
      .querySelectorAll(
        "#video-player-volume-slider, #video-player-volume-slider-mb, #video-exp-volume-slider"
      )
      .forEach((s) => (s.value = Number(volume)));
  }

  updateVolumeIcon(vol) {
    const icons = document.querySelectorAll(
      "#video-player-volume-btn i, #video-player-volume-btn-mb i, #video-exp-volume-btn i"
    );

    icons.forEach((icon) => {
      icon.classList.remove(
        "fa-volume-high",
        "fa-volume-low",
        "fa-volume-xmark"
      );

      if (vol == 0) {
        icon.classList.add("fa-solid", "fa-volume-xmark");
      } else if (vol <= 50) {
        icon.classList.add("fa-solid", "fa-volume-low");
      } else {
        icon.classList.add("fa-solid", "fa-volume-high");
      }
    });
  }

  seek(percent) {
    const duration = this.player.getDuration();
    const newTime = (percent / 100) * duration;
    this.player.seekTo(newTime, true);
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    if (this.isShuffle) this.isRepeat = false;
    [
      "#video-player-shuffle-btn",
      "#video-player-shuffle-btn-mb",
      "#video-exp-shuffle-btn",
    ].forEach((id) =>
      document.querySelector(id)?.classList.toggle("active", this.isShuffle)
    );
    [
      "#video-player-repeat-btn",
      "#video-player-repeat-btn-mb",
      "#video-exp-repeat-btn",
    ].forEach((id) =>
      document.querySelector(id)?.classList.toggle("active", this.isRepeat)
    );
  }

  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
    if (this.isRepeat) this.isShuffle = false;
    [
      "#video-player-repeat-btn",
      "#video-player-repeat-btn-mb",
      "#video-exp-repeat-btn",
    ].forEach((id) =>
      document.querySelector(id)?.classList.toggle("active", this.isRepeat)
    );
    [
      "#video-player-shuffle-btn",
      "#video-player-shuffle-btn-mb",
      "#video-exp-shuffle-btn",
    ].forEach((id) =>
      document.querySelector(id)?.classList.toggle("active", this.isShuffle)
    );
  }

  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      this.startTrackingProgress();
    }
    if (event.data === YT.PlayerState.ENDED) {
      if (this.isRepeat) this.play(this.currentVideo);
      else if (this.isShuffle) this.playRandomVideo();
      else this.nextVideo();
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

    toggleMenu("#video-mobile-options-btn", "#video-mobile-options-menu");
    toggleMenu("#video-mobile-right-toggle", "#video-mobile-right-menu");
  }

  updateExpandedInfo() {
    if (!this.currentVideo) return;
    const v = this.currentVideo;

    document.querySelector("#video-exp-title").textContent = v.title;
    document.querySelector("#video-exp-artist").textContent =
      v?.channels?.[0] || "Không rõ";

    const duration = this.player?.getDuration() || v.duration;
    document.querySelector("#video-exp-duration").textContent =
      formatVideoDuration(duration);
  }

  renderRelatedList() {
    const box = document.querySelector("#video-exp-related-list");
    if (!box) return;

    box.innerHTML = this.videos
      .map(
        (t) => `
      <div class="video-item flex items-center gap-4 p-3 rounded-lg text-white hover:bg-white/10 cursor-pointer transition group"
           data-video-id="${t.id}">
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
                t?.chanel || "Không rõ"
              }</div>
            </div>

            <div class="text-sm text-white/50">${formatDuration(
              t.duration
            )}</div>
        </div>
    `
      )
      .join("");

    if (this.currentVideo) {
      this.highlightActiveVideo(this.currentVideo.id);
    }
  }

  initExpandedVideoPlayer() {
    if (this._expandedBound) return;
    this._expandedBound = true;

    const expanded = document.querySelector("#video-player-expanded");
    const iframeContainer = document.querySelector("#video-iframe-container");
    const mainUI = document.querySelector("#video-player-wrapper");

    let isMini = false;

    function hideAllExceptIframe(parent) {
      Array.from(parent.children).forEach((child) => {
        if (child.id === "video-iframe-container") {
          child.style.display = "block";
        } else {
          child.style.display = "none";
          if (child.children.length > 0) hideAllExceptIframe(child);
        }
      });
    }

    function showIframeUpToRoot(iframeEl, rootEl) {
      let el = iframeEl;
      while (el && el !== rootEl) {
        el.style.display = "block";
        el = el.parentElement;
      }
    }

    function showAll(parent) {
      Array.from(parent.children).forEach((child) => {
        child.style.display = "";
        if (child.children.length > 0) showAll(child);
      });
    }

    const shrinkToMini = () => {
      if (isMini) return;
      isMini = true;

      const miniWidth = iframeContainer.offsetWidth * 0.3;
      const miniHeight = iframeContainer.offsetHeight * 0.5;

      hideAllExceptIframe(expanded);
      showIframeUpToRoot(iframeContainer, expanded);

      expanded.style.position = "fixed";
      expanded.style.width = miniWidth + "px";
      expanded.style.height = miniHeight + "px";
      expanded.style.top = "auto";
      expanded.style.left = "auto";
      expanded.style.bottom = "1rem";
      expanded.style.right = "0";
      expanded.style.borderRadius = "0.5rem";
      expanded.style.zIndex = "999";
      expanded.style.transition = "all 0.3s ease, transform 0.3s ease";
      expanded.style.transform = "translate(0, -62px)";

      iframeContainer.style.width = "calc(100% + 40px)";
      iframeContainer.style.marginLeft = "-20px";
      iframeContainer.style.marginRight = "-20px";
      iframeContainer.style.height = "100%";
      mainUI.classList.remove("hidden");
    };

    const expandBack = () => {
      if (!isMini) return;
      isMini = false;

      showAll(expanded);

      expanded.style.transition = "all 0.3s ease, transform 0.3s ease";
      expanded.style.width = "100%";
      expanded.style.height = "100%";
      expanded.style.bottom = "0";
      expanded.style.right = "0";
      expanded.style.borderRadius = "0";
      expanded.style.position = "fixed";
      expanded.style.zIndex = "50";
      expanded.style.transform = "translateY(100%)";

      requestAnimationFrame(() => {
        expanded.style.transform = "translateY(0)";
      });
      iframeContainer.style.width = "100%";
      iframeContainer.style.height = "60vh";
    };

    this._expandedHandlers = {
      mainClick: (e) => {
        if (e.target.closest(".video-player-act")) return;
        if (e.target.id === "video-player-progress-bar") return;
        expandBack();
      },
      closeBtn: () => {
        shrinkToMini();
        if (this.currentVideo) this.updatePlayerUI(this.currentVideo);
      },
      playBtn: () => this.togglePlay(),
      nextBtn: () => this.nextVideo(),
      prevBtn: () => this.prevVideo(),
      progress: (e) => this.seek(e.target.value),
      shuffle: () => this.toggleShuffle(),
      repeat: () => this.toggleRepeat(),
    };

    mainUI.addEventListener("click", this._expandedHandlers.mainClick);
    document
      .querySelector("#video-player-expanded-close")
      .addEventListener("click", this._expandedHandlers.closeBtn);
    document
      .querySelector("#video-exp-play-btn")
      .addEventListener("click", this._expandedHandlers.playBtn);
    document
      .querySelector("#video-exp-next-btn")
      .addEventListener("click", this._expandedHandlers.nextBtn);
    document
      .querySelector("#video-exp-prev-btn")
      .addEventListener("click", this._expandedHandlers.prevBtn);
    document
      .querySelector("#video-exp-progress")
      .addEventListener("input", this._expandedHandlers.progress);
    document
      .querySelector("#video-exp-shuffle-btn")
      .addEventListener("click", this._expandedHandlers.shuffle);
    document
      .querySelector("#video-exp-repeat-btn")
      .addEventListener("click", this._expandedHandlers.repeat);
  }

  initVideoPlayer() {
    if (this._miniBound) return;
    this._miniBound = true;

    const miniPlayer = document.querySelector("#video-player-wrapper");
    const expanded = document.querySelector("#video-player-expanded");
    this._miniHandlers = {
      miniClick: (e) => {
        if (e.target.closest(".video-player-act")) return;
        if (e.target.id === "video-player-progress-bar") return;

        expanded.classList.remove("hidden");
        setTimeout(() => expanded.classList.add("open"));
        miniPlayer.classList.add("hidden");

        this.updateExpandedInfo();
        this.renderRelatedList();
      },
    };

    miniPlayer.addEventListener("click", this._miniHandlers.miniClick);
  }

  destroy() {
    try {
      if (this.player && this.player.destroy) {
        this.player.destroy();
      }
    } catch (err) {
      console.log("Có lỗi khi hủy trình phát video!");
    }

    this.player = null;
    this.isReady = false;
    this.currentVideo = null;
    this._pendingVideo = null;

    const miniUI = document.querySelector("#video-player-wrapper");
    const expanded = document.querySelector("#video-player-expanded");
    const iframeContainer = document.querySelector("#video-iframe-container");

    clearInterval(this._progressTimer);
    this._progressTimer = null;

    miniUI?.classList.add("hidden");
    expanded?.classList.add("hidden");

    if (this._expandedHandlers) {
      const mainUI = document.querySelector("#video-player-wrapper");
      mainUI?.removeEventListener("click", this._expandedHandlers.mainClick);
      document
        .querySelector("#video-player-expanded-close")
        ?.removeEventListener("click", this._expandedHandlers.closeBtn);
      document
        .querySelector("#video-exp-play-btn")
        ?.removeEventListener("click", this._expandedHandlers.playBtn);
      document
        .querySelector("#video-exp-next-btn")
        ?.removeEventListener("click", this._expandedHandlers.nextBtn);
      document
        .querySelector("#video-exp-prev-btn")
        ?.removeEventListener("click", this._expandedHandlers.prevBtn);
      document
        .querySelector("#video-exp-progress")
        ?.removeEventListener("input", this._expandedHandlers.progress);
      document
        .querySelector("#video-exp-shuffle-btn")
        ?.removeEventListener("click", this._expandedHandlers.shuffle);
      document
        .querySelector("#video-exp-repeat-btn")
        ?.removeEventListener("click", this._expandedHandlers.repeat);
    }

    this._expandedBound = false;
    this._eventsBound = false;

    if (this._miniHandlers) {
      miniUI?.removeEventListener("click", this._miniHandlers.miniClick);
    }

    this._expandedBound = false;
    this._miniBound = false;
    this._expandedHandlers = null;
    this._miniHandlers = null;

    if (expanded) {
      expanded.style.cssText = "";
      const showAll = (parent) => {
        Array.from(parent.children).forEach((child) => {
          child.style.display = "";
          if (child.children.length > 0) showAll(child);
        });
      };
      showAll(expanded);
    }

    if (iframeContainer) {
      iframeContainer.style.width = "100%";
      iframeContainer.style.height = "60vh";
    }
  }

  closePlayer() {
    if (!confirm("Bạn muốn tắt trình phát video?")) return;
    this.destroy();

    document.querySelector("#video-player-wrapper")?.classList.add("hidden");
    document.querySelector("#video-player-expanded")?.classList.add("hidden");
  }

  addListener = (selector, event, handler) => {
    document
      .querySelectorAll(selector)
      .forEach((el) => el.addEventListener(event, handler));
  };

  init() {
    if (window.YT && window.YT.Player && !this.apiReady) {
      this.onYouTubeAPIReady();
    }

    this.addListener("#video-player-play-btn", "click", () =>
      this.togglePlay()
    );
    this.addListener("#video-player-next-btn", "click", () => this.nextVideo());
    this.addListener("#video-player-prev-btn", "click", () => this.prevVideo());

    this.addListener("#video-player-volume-slider", "input", (e) =>
      this.setVolume(e.target.value)
    );
    this.addListener("#video-player-volume-slider-mb", "input", (e) =>
      this.setVolume(e.target.value)
    );
    this.addListener("#video-exp-volume-slider", "input", (e) =>
      this.setVolume(e.target.value)
    );
    this.addListener("#video-player-volume-btn", "click", () =>
      this.toggleMute()
    );
    this.addListener("#video-player-volume-btn-mb", "click", () =>
      this.toggleMute()
    );
    this.addListener("#video-exp-volume-btn", "click", () => this.toggleMute());
    this.addListener("#video-player-shuffle-btn", "click", () =>
      this.toggleShuffle()
    );
    this.addListener("#video-player-shuffle-btn-mb", "click", () =>
      this.toggleShuffle()
    );
    this.addListener("#video-player-repeat-btn", "click", () =>
      this.toggleRepeat()
    );
    this.addListener("#video-player-repeat-btn-mb", "click", () =>
      this.toggleRepeat()
    );

    this.addListener("#video-player-progress-bar", "input", (e) =>
      this.seek(e.target.value)
    );
    this.addListener("#video-player-close-btn", "click", () => {
      this.closePlayer();
    });

    this.toggleMobileControl();
  }
}

export const videoPlayer = new PlayerVideoController();
window.onYouTubeIframeAPIReady = () => videoPlayer.onYouTubeAPIReady();
