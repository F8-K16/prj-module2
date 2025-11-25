import AppService from "../services/AppService";
import ArtistsList from "../components/ArtistsList";
import VideosList from "../components/VideosList";

export async function ChartsController(defaultCountry = "GLOBAL") {
  const countrySelect = document.querySelector("#country-select");
  if (!countrySelect) return;

  const chartsContent = document.querySelector("#charts-content");
  if (!chartsContent) return;

  async function updateCharts(country) {
    const [videos, artists] = await Promise.all([
      AppService.Explore.getTopVideos(country),
      AppService.Explore.getTopArtists(country),
    ]);

    chartsContent.innerHTML =
      VideosList("Bảng xếp hạng video", videos) +
      ArtistsList("Nghệ sĩ hàng đầu", artists);
  }

  countrySelect.addEventListener("change", async (e) => {
    await updateCharts(e.target.value);
  });

  await updateCharts(defaultCountry);
}
