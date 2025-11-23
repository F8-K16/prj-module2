import httpsRequest from "../utils/httpsRequest";

export default {
  async getPlaylistDetails(slug) {
    const res = await httpsRequest.get(`/playlists/details/${slug}?limit=50`);
    return res.data || [];
  },

  async getAlbumDetails(slug) {
    const res = await httpsRequest.get(`/albums/details/${slug}`);
    return res.data || [];
  },

  async geSongDetails(id) {
    const res = await httpsRequest.get(`/songs/details/${id}`);
    return res.data || [];
  },

  async geVideoDetails(id) {
    const res = await httpsRequest.get(`/videos/details/${id}`);
    return res.data || [];
  },

  async register(payload) {
    try {
      const res = await httpsRequest.post("/auth/register", payload);
      return res.data;
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      throw error;
    }
  },

  async login(payload) {
    try {
      const res = await httpsRequest.post("/auth/login", payload);
      return res.data;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      throw error;
    }
  },

  async getProfile() {
    const res = await httpsRequest.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data;
  },

  async logout(token) {
    await httpsRequest.delete("/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async updateProfile(data) {
    try {
      const res = await httpsRequest.patch("/auth/me", data);
      return res.data;
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      throw error;
    }
  },

  async changePassword(data) {
    try {
      const res = await httpsRequest.patch("/auth/change-password", data);
      return res.data;
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      throw error;
    }
  },
};
