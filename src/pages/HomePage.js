import TagList from "../components/TagList";
import QuickPicksList from "../components/QuickPicksList";
import CardList from "../components/CardList";

import HomeService from "../services/HomeService";
import AppService from "../services/AppService";

export default async function HomePage() {
  let user = null;

  const token = localStorage.getItem("token");
  if (token) {
    try {
      user = await AppService.getProfile();
    } catch (error) {
      console.log("Không lấy được thông tin user", error);
    }
  }

  const [quickPick, moods, albums, todaysHits, playLists] = await Promise.all([
    HomeService.getQuickPicks(),
    HomeService.getMoods(),
    HomeService.getAlbumsForYou(),
    HomeService.getTodaysHits(),
    HomeService.getPlaylistsByCountry("VN"),
  ]);

  return `
    <div class="p-2">
      ${
        user
          ? `<h2 class='text-4xl lg:text-5xl font-semibold text-white mb-20'>👋 Chào mừng <span>${user.name}</span></h2>`
          : ""
      }
      ${TagList(moods)}
      ${QuickPicksList("Quick Picks", quickPick, "/playlists/details")}
      ${CardList("Album gợi ý cho bạn", albums, "/albums/details")}
      ${CardList("Today's Hits", todaysHits)}
      ${CardList("Nhạc Việt", playLists)}
    </div>
  `;
}
