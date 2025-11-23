import Navigo from "navigo";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import LibraryPage from "../pages/LibraryPage";
import LoginPage from "../pages/LoginPage";
import NewReleasePage from "../pages/NewReleasePage";
import ChartsPage from "../pages/ChartsPage";
import { UI } from "../controller/UIController";
import { ChartsController } from "../controller/ChartsController";
import MoodsGenresPage from "../pages/MoodsGenresPage";
import MoodDetailPage from "../pages/MoodDetailPage";
import CategoryDetailPage from "../pages/CategoryDetailPage";

import ExploreService from "../services/ExploreService";
import AppService from "../services/AppService";
import LineSongsDetailPage from "../pages/LineSongsDetailPage";
import AlbumPlaylistPage from "../pages/AlbumPlaylistPage";
import SongDetailPage from "../pages/SongDetailPage";
import ProfilePage from "../pages/ProfilePage";
import { player } from "../controller/PlayerController";
import {
  changePasswordHandle,
  logoutHandle,
  updateProfileHandle,
} from "../controller/AuthController";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import HomeService from "../services/HomeService";

const router = new Navigo("/", { hash: false, noMatchWarning: true });

async function render(page) {
  document.querySelector("#main-view").innerHTML = await page();
  UI.setActiveSidebar();
}

router.on({
  "/": async () => await render(HomePage),
  "/explore": async () => {
    const [albums, moodsGenres, videos] = await Promise.all([
      ExploreService.getAlbums(),
      ExploreService.getMoodsGenres(),
      ExploreService.getVideos(),
    ]);

    return render(() => ExplorePage(albums, moodsGenres, videos));
  },
  "/library": async () => await render(LibraryPage),
  "/login": async () => {
    await render(LoginPage);
    UI.initLoginForm();
  },
  "/new-releases": async () => {
    const [releases, videos] = await Promise.all([
      ExploreService.getNewReleases(),
      ExploreService.getVideos(),
    ]);
    return render(() => NewReleasePage(releases, videos));
  },
  "/charts": async () => {
    document.querySelector("#main-view").innerHTML = await ChartsPage();
    ChartsController();
  },
  "/moods/:slug": async ({ data }) => {
    const moodDetails = await HomeService.getMoodDetails(data.slug);
    return render(() => MoodDetailPage(moodDetails, data));
  },
  "/moods-and-genres": async () => await render(MoodsGenresPage),
  "/categories/:slug": async ({ data }) => {
    const categories = await ExploreService.getCategoryBySlug(data.slug);
    return render(() => CategoryDetailPage(categories));
  },
  "/lines/:slug": async ({ data }) => {
    const [songs, playlists, videos, albums] = await Promise.all([
      ExploreService.getLineSongBySlug(data.slug),
      ExploreService.getLinePlaylistBySlug(data.slug),
      ExploreService.getLineVideoBySlug(data.slug),
      ExploreService.getLineAlbumBySlug(data.slug),
    ]);

    return render(() => LineSongsDetailPage(songs, playlists, videos, albums));
  },
  "/playlists/details/:slug": async ({ data }) => {
    const playlistDetails = await AppService.getPlaylistDetails(data.slug);
    return render(() => AlbumPlaylistPage(playlistDetails));
  },
  "/albums/details/:slug": async ({ data }) => {
    const albumDetails = await AppService.getAlbumDetails(data.slug);
    return render(() => AlbumPlaylistPage(albumDetails));
  },
  "/songs/details/:id": async ({ data }) => {
    const songDetails = await AppService.geSongDetails(data.id);
    await render(() => SongDetailPage(songDetails, data));
    const songToPlay = player.songs.find((s) => s.id === data.id);
    if (songToPlay) {
      player.loadSong(songToPlay);
      player.playSong();
      document.querySelector("#player-wrapper").classList.remove("hidden");
      UI.highlightActiveSong(data.id);
    }
  },
  "/videos/details/:id": async ({ data }) => {
    const videoDetails = await AppService.geVideoDetails(data.id);
    await render(() => SongDetailPage(videoDetails, data));
  },
  "/auth/logout": async () => {
    await logoutHandle();
  },
  "/auth/profile": async () => {
    const user = await AppService.getProfile();
    await render(() => ProfilePage(user));
    updateProfileHandle();
  },
  "/auth/change-password": async () => {
    await render(ChangePasswordPage);
    changePasswordHandle();
  },
});

export default router;
