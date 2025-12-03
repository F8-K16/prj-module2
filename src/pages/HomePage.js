import TagList from "../components/TagList";
import QuickPicksList from "../components/QuickPicksList";
import CardList from "../components/CardList";

export default function HomePage(
  quickPick,
  moods,
  albums,
  todaysHits,
  playLists,
  user,
  personalized
) {
  return `
    <div class="p-2">
      ${
        user
          ? `<h2 class='text-4xl lg:text-5xl font-semibold text-white mb-20'>👋 Chào mừng <span>${user.name}</span></h2>`
          : ""
      }
      ${TagList(moods)}
      ${personalized.length ? QuickPicksList("Nghe gần đây", personalized) : ""}
      ${QuickPicksList("Quick Picks", quickPick)}
      ${CardList("Album gợi ý cho bạn", albums, "/albums/details")}
      ${CardList("Today's Hits", todaysHits)}
      ${CardList("Nhạc Việt", playLists)}
    </div>
  `;
}
