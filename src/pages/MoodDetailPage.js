import CardList from "../components/CardList";
import QuickPicksList from "../components/QuickPicksList";
import TagList from "../components/TagList";
import AppService from "../services/AppService";

export default async function MoodDetailPage(moodsDetails, quickPicks, params) {
  const slug = params.slug;
  const info = moodsDetails.hero;

  const moods = await AppService.Home.getMoods();

  return `
        <div class="p-4 text-white">
          <div class="mb-6">
              ${TagList(moods, slug)}
          </div>
          <h1 class="font-bold text-[45px] mb-4">${info.title}</h1>
          <p>${info.subtitle}</p>
          ${QuickPicksList("Quick Picks", quickPicks)}
          
          ${moodsDetails.sections
            .map((s) => CardList(s.title, s.items))
            .join("")}
        </div>
  
      `;
}
