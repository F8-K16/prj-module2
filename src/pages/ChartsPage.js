import VideoList from "../components/VideosList";
import ArtistsList from "../components/ArtistsList";

export default async function ChartsPage(countries, topVideos, topArtists) {
  return `
    <div class="p-4 text-white">
      <h1 class="font-bold text-[45px] mb-10">Bảng xếp hạng</h1>

      <div class="relative w-[113px] mb-6">
        <select
          id="country-select"
          class="relative appearance-none py-2 pl-4 pr-8 rounded-full bg-[#1d1d1d] text-white border border-gray-700 cursor-pointer"
        >
          ${countries
            .map((c) => `<option value="${c.code}">${c.name}</option>`)
            .join("")}
        </select>

        <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
      </div>

      <div id="charts-content">
        ${VideoList("Bảng xếp hạng video", topVideos)}
        ${ArtistsList("Nghệ sĩ hàng đầu", topArtists)}
      </div>
    </div>
  `;
}
