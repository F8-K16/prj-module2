import AppService from "../services/AppService";

export async function RecordPlayEvent(type, id) {
  try {
    let payload = {};

    if (type === "song") payload.songId = id;
    if (type === "album") payload.albumId = id;
    if (type === "playlist") payload.playlistId = id;

    await AppService.Events.playRecord(payload);
  } catch (err) {
    console.warn("Play event error:", err);
  }
}
