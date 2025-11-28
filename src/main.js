import "./assets/main.css";
import App from "./app";
import router from "./router/router";
import { UI } from "./controller/UIController";
import { player } from "./controller/PlayerController";
import { search } from "./controller/SearchController";

if (!window.__APP_INITIALIZED__) {
  document.querySelector("#app").innerHTML = await App();
  player.init();
  UI.init();
  search.init();
  window.__APP_INITIALIZED__ = true;
}

router.resolve();
