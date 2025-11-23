import httpsRequest from "../utils/httpsRequest";

export default {
  // Home Page API
  async getQuickPicks() {
    const res = await httpsRequest.get(`/quick-picks`);
    return res.data || [];
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

  async getMoods() {
    const res = await httpsRequest.get("/moods");
    return res.data.items || [];
  },

  async getMoodDetails(slug) {
    const res = await httpsRequest.get(`/moods/${slug}`);
    return res.data || {};
  },
};
