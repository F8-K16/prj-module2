import httpsRequest from "../utils/httpsRequest";

export default {
  async getAlbums() {
    const res = await httpsRequest.get("/explore/albums");
    return res.data.items || [];
  },

  async getMoodsGenres() {
    const res = await httpsRequest.get("/explore/meta");
    const categories = res.data.categories || [];
    const lines = res.data.lines || [];
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

  async getCategories() {
    const res = await httpsRequest.get(`/categories`);
    return res.data.items || [];
  },

  async getLineSongs() {
    const res = await httpsRequest.get(`/lines`);
    return res.data.items || [];
  },

  async getCategoryBySlug(slug) {
    const res = await httpsRequest.get(`/categories/${slug}`);
    return res.data || {};
  },

  async getLineSongBySlug(slug) {
    const res = await httpsRequest.get(`/lines/${slug}/songs`);
    return res.data.items || {};
  },

  async getLinePlaylistBySlug(slug) {
    const res = await httpsRequest.get(`/lines/${slug}/playlists`);
    return res.data.items || {};
  },

  async getLineVideoBySlug(slug) {
    const res = await httpsRequest.get(`/lines/${slug}/videos`);
    return res.data.items || {};
  },

  async getLineAlbumBySlug(slug) {
    const res = await httpsRequest.get(`/lines/${slug}/albums`);
    return res.data.items || {};
  },
};
