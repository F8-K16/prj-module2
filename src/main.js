import "./assets/main.css";
import App from "./app";
import router from "./router/router";
import { UI } from "./controller/UIController";
import { songPlayer } from "./controller/SongPlayerController";
import { search } from "./controller/SearchController";
import { videoPlayer } from "./controller/VideoPlayerController";

if (!window.__APP_INITIALIZED__) {
  document.querySelector("#app").innerHTML = await App();
  songPlayer.init();
  videoPlayer.init();
  UI.init();
  search.init();
  window.__APP_INITIALIZED__ = true;
}

router.resolve();
