import CardList from "../components/CardList";
import TagList from "../components/TagList";
import AppService from "../services/AppService";

export default async function MoodDetailPage(m, params) {
  const slug = params.slug;
  const info = m.hero;

  const moods = await AppService.Home.getMoods();

  return `
        <div class="p-4 text-white">
          <div class="mb-6">
              ${TagList(moods, slug)}
          </div>
          <h1 class="font-bold text-[45px] mb-4">${info.title}</h1>
          <p>${info.subtitle}</p>
          ${m.sections.map((s) => CardList(s.title, s.items)).join("")}
        </div>
  
      `;
}
