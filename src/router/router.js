import Navigo from "navigo";
import AppService from "../services/AppService";
import { ChartsController } from "../controller/ChartsController";

import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import LibraryPage from "../pages/LibraryPage";
import LoginPage from "../pages/LoginPage";
import NewReleasePage from "../pages/NewReleasePage";
import ChartsPage from "../pages/ChartsPage";
import MoodsGenresPage from "../pages/MoodsGenresPage";
import MoodDetailPage from "../pages/MoodDetailPage";
import CategoryDetailPage from "../pages/CategoryDetailPage";
import LineSongsDetailPage from "../pages/LineSongsDetailPage";
import AlbumPlaylistPage from "../pages/AlbumPlaylistPage";
import SongDetailPage from "../pages/SongDetailPage";
import VideoDetailPage from "../pages/VideoDetailPage";
import ProfilePage from "../pages/ProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";

import { UI } from "../controller/UIController";
import { songPlayer } from "../controller/SongPlayerController";
import { videoPlayer } from "../controller/VideoPlayerController";
import {
  changePasswordHandle,
  logoutHandle,
  updateProfileHandle,
} from "../controller/AuthController";

import { RecordPlayEvent } from "../utils/RecordPlayEvent";
import { loading } from "../utils/loading";
import SearchResultsPage from "../pages/SearchResultsPage";

const router = new Navigo("/");

export async function render(page, controller, minLoadingTime = 200) {
  const startTime = Date.now();
  loading.show();
  await new Promise((resolve) => setTimeout(resolve, 0));

  const html = await page();
  const main = document.querySelector("#main-view");
  main.innerHTML = html;
  if (controller) controller();

  router.updatePageLinks();
  UI.initHScroll();
  UI.initNavbarSearchMobile();
  UI.setActiveSidebar();
  UI.closeSidebar();
  UI.hideDropdownUser();

  window.scrollTo({ top: 0, behavior: "auto" });

  const elapsed = Date.now() - startTime;
  const remaining = minLoadingTime - elapsed;
  if (remaining > 0) {
    setTimeout(() => loading.hide(), remaining);
  } else {
    loading.hide();
  }
}

function isLoggedIn() {
  return !!localStorage.getItem("token");
}

async function requireProfile() {
  try {
    const user = await AppService.Auth.getProfile();
    return user;
  } catch (error) {
    return null;
  }
}

// -------------------------------------------------------------------------

router.on({
  "/": async () => {
    let user = null;
    let personalized = [];

    if (isLoggedIn()) {
      try {
        user = await AppService.Auth.getProfile();
        personalized = await AppService.Home.getPersonalized();
      } catch (error) {}
    }
    const [quickPick, moods, albums, todaysHits, playLists] = await Promise.all(
      [
        AppService.Home.getQuickPicks(),
        AppService.Home.getMoods(),
        AppService.Home.getAlbumsForYou(),
        AppService.Home.getTodaysHits(),
        AppService.Home.getPlaylistsByCountry("VN"),
      ]
    );
    await render(
      () =>
        HomePage(
          quickPick,
          moods,
          albums,
          todaysHits,
          playLists,
          user,
          personalized
        ),
      null,
      1000
    );
  },

  "/explore": async () => {
    const [albums, moodsGenres, videos] = await Promise.all([
      AppService.Explore.getAlbums(),
      AppService.Explore.getMoodsGenres(),
      AppService.Explore.getVideos(),
    ]);

    await render(() => ExplorePage(albums, moodsGenres, videos), null, 1000);
  },

  "/library": async () => {
    const user = await requireProfile();
    if (!user) return;
    await render(LibraryPage);
  },

  "/login": async () => {
    await render(LoginPage);
    UI.initLoginForm();
  },

  "/new-releases": async () => {
    const [releases, videos] = await Promise.all([
      AppService.Explore.getNewReleases(),
      AppService.Explore.getVideos(),
    ]);

    await render(() => NewReleasePage(releases, videos));
  },

  "/charts": async () => {
    const [countries, topVideos, topArtists] = await Promise.all([
      AppService.Explore.getCountries(),
      AppService.Explore.getTopVideos("GLOBAL"),
      AppService.Explore.getTopArtists("GLOBAL"),
    ]);
    await render(
      () => ChartsPage(countries, topVideos, topArtists),
      ChartsController
    );
  },

  "/moods/:slug": async ({ data }) => {
    const moodDetails = await AppService.Home.getMoodDetails(data.slug);
    const quickPicks = await AppService.Home.getQuickPicksByMood(data.slug);

    await render(() => MoodDetailPage(moodDetails, quickPicks, data));
  },

  "/moods-and-genres": async () => {
    const [categories, lineSongs] = await Promise.all([
      AppService.Categories.getAll(),
      AppService.Lines.getAll(),
    ]);

    await render(() => MoodsGenresPage(categories, lineSongs));
  },

  "/categories/:slug": async ({ data }) => {
    const categories = await AppService.Categories.getCategory(data.slug);
    await render(() => CategoryDetailPage(categories));
  },

  "/lines/:slug": async ({ data }) => {
    const [songs, playlists, videos, albums] = await Promise.all([
      AppService.Lines.getLineSongs(data.slug),
      AppService.Lines.getLinePlaylists(data.slug),
      AppService.Lines.getLineVideos(data.slug),
      AppService.Lines.getLineAlbums(data.slug),
    ]);

    await render(() => LineSongsDetailPage(songs, playlists, videos, albums));
  },

  "/playlists/details/:slug": async ({ data }) => {
    const playlistDetails = await AppService.Details.getPlaylist(data.slug);
    RecordPlayEvent("playlist", playlistDetails.id);
    await render(() => AlbumPlaylistPage(playlistDetails), null, 500);
  },

  "/albums/details/:slug": async ({ data }) => {
    const albums = await AppService.Details.getAlbum(data.slug);
    RecordPlayEvent("album", albums.id);
    await render(() => AlbumPlaylistPage(albums), null, 500);
  },

  "/songs/details/:id": async ({ data }) => {
    videoPlayer.destroy();
    const songDetails = await AppService.Details.getSong(data.id);
    RecordPlayEvent("song", data.id);
    await render(() => SongDetailPage(songDetails, data), null, 500);
    await songPlayer.playSongFromDetail(data.id);
  },

  "/videos/details/:id": async ({ data }) => {
    songPlayer.destroy();
    const videoDetails = await AppService.Details.getVideo(data.id);
    await render(() => VideoDetailPage(videoDetails, data), null, 500);
  },

  "/search": async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));

    const keyword =
      new URLSearchParams(window.location.search).get("keyword") || "";

    if (!keyword) {
      await render(() => SearchResultsPage("", null));
      return;
    }

    const data = await AppService.Search.search(keyword);
    await render(() => SearchResultsPage(keyword, data));
  },

  "/auth/logout": async () => await logoutHandle(),

  "/auth/profile": async () => {
    const user = await requireProfile();
    if (!user) return;

    await render(() => ProfilePage(user), updateProfileHandle);
  },

  "/auth/change-password": async () => {
    const user = await requireProfile();
    if (!user) return;

    await render(ChangePasswordPage, changePasswordHandle);
  },
});

export default router;
