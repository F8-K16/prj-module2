import httpsRequest from "../utils/httpsRequest";

const AppService = {
  /* ==========================
   * HOME PAGE API
   * ========================== */
  Home: {
    async getPersonalized() {
      const res = await httpsRequest.get("/home/personalized?limit=12");
      return res.data;
    },

    async getMoods() {
      const res = await httpsRequest.get("/moods");
      return res.data.items || [];
    },

    async getMoodDetails(slug) {
      const res = await httpsRequest.get(`/moods/${slug}`);
      return res.data || {};
    },

    async getQuickPicks() {
      const res = await httpsRequest.get("/quick-picks");
      return res.data || [];
    },

    async getQuickPicksByMood(mood) {
      const res = await httpsRequest.get(`/quick-picks?mood=${mood}`);
      return res.data;
    },

    async getAlbumsForYou() {
      const res = await httpsRequest.get("/home/albums-for-you");
      return res.data || [];
    },

    async getTodaysHits() {
      const res = await httpsRequest.get("/home/todays-hits");
      return res.data || [];
    },

    async getPlaylistsByCountry(country) {
      const res = await httpsRequest.get(
        `/playlists/by-country?country=${country}`
      );
      return res.data || [];
    },
  },

  /* ==========================
   * EXPLORE PAGE API
   * ========================== */
  Explore: {
    async getAlbums() {
      const res = await httpsRequest.get("/explore/albums");
      return res.data.items || [];
    },

    async getMoodsGenres() {
      const res = await httpsRequest.get("/explore/meta");

      const categories =
        res.data.categories?.map((c) => ({
          ...c,
          path: "/categories",
        })) || [];

      const lines =
        res.data.lines?.map((l) => ({
          ...l,
          path: "/lines",
        })) || [];

      return [...categories, ...lines];
    },

    async getVideos() {
      const res = await httpsRequest.get("/explore/videos");
      return res.data.items || [];
    },

    async getNewReleases() {
      const res = await httpsRequest.get("/explore/new-releases");
      return res.data.items || [];
    },

    async getCountries() {
      const res = await httpsRequest.get("/charts/countries");
      return res.data.countries || [];
    },

    async getTopVideos(country) {
      const res = await httpsRequest.get(`/charts/videos?country=${country}`);
      return res.data.items || [];
    },

    async getTopArtists(country) {
      const res = await httpsRequest.get(
        `/charts/top-artists?country=${country}`
      );
      return res.data.items || [];
    },
  },

  /* ==========================
   * CATEGORIES API
   * ========================== */
  Categories: {
    async getAll() {
      const res = await httpsRequest.get("/categories");
      return res.data.items || [];
    },

    async getCategory(slug) {
      const res = await httpsRequest.get(`/categories/${slug}`);
      return res.data || {};
    },
  },

  /* ==========================
   * LINES API
   * ========================== */
  Lines: {
    async getAll() {
      const res = await httpsRequest.get("/lines");
      return res.data.items || [];
    },

    async getLineSongs(slug) {
      const res = await httpsRequest.get(`/lines/${slug}/songs`);
      return res.data.items || [];
    },

    async getLinePlaylists(slug) {
      const res = await httpsRequest.get(`/lines/${slug}/playlists`);
      return res.data.items || [];
    },

    async getLineVideos(slug) {
      const res = await httpsRequest.get(`/lines/${slug}/videos`);
      return res.data.items || [];
    },

    async getLineAlbums(slug) {
      const res = await httpsRequest.get(`/lines/${slug}/albums`);
      return res.data.items || [];
    },
  },

  /* ==========================
   * DETAILS API (Playlist, Album, Song, Video)
   * ========================== */
  Details: {
    async getPlaylist(slug) {
      const res = await httpsRequest.get(`/playlists/details/${slug}?limit=50`);
      return res.data || {};
    },

    async getAlbum(slug) {
      const res = await httpsRequest.get(`/albums/details/${slug}?limit=50`);
      return res.data || {};
    },

    async getSong(id) {
      const res = await httpsRequest.get(`/songs/details/${id}`);
      return res.data || {};
    },

    async getVideo(id) {
      const res = await httpsRequest.get(`/videos/details/${id}`);
      return res.data || {};
    },
  },

  /* ==========================
   * AUTH API
   * ========================== */
  Auth: {
    async register(payload) {
      const res = await httpsRequest.post("/auth/register", payload);
      return res.data;
    },

    async login(payload) {
      const res = await httpsRequest.post("/auth/login", payload);
      return res.data;
    },

    async getProfile() {
      const res = await httpsRequest.get("/auth/me");
      return res.data;
    },

    async logout() {
      return httpsRequest.delete("/auth/logout");
    },

    async updateProfile(data) {
      const res = await httpsRequest.patch("/auth/me", data);
      return res.data;
    },

    async changePassword(data) {
      const res = await httpsRequest.patch("/auth/change-password", data);
      return res.data;
    },
  },

  /* ==========================
   * SEARCH
   * ========================== */
  Search: {
    async search(query) {
      const res = await httpsRequest.get(`/search/suggestions?q=${query}`);
      return res.data || {};
    },
  },

  /* ==========================
   * EVENTS
   * ========================== */
  Events: {
    async playRecord(payload) {
      const token = localStorage.getItem("token");

      if (!token) return;
      return httpsRequest.post("/events/play", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  },
};

export default AppService;
