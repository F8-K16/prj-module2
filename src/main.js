import "./assets/main.css";
import { App } from "./app";
import router from "./router/router";
import { UI } from "./controller/UIController";
import { player } from "./controller/PlayerController";

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector("#app").innerHTML = await App();

  player.init();
  UI.init();
  router.resolve();
});
