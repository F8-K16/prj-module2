export default function InfoDetails(data) {
  const isAlbum = !!data.albumType;
  const isPlaylist = !data.albumType && data.songCount;
  const isTrack = !isAlbum && !isPlaylist;

  const cover = data.thumbnails?.[0];
  const title = data.title;
  const description = data.description || "";

  const duration = data.duration > 0 ? data.duration : null;
  const popularity = data.popularity >= 0 ? data.popularity : null;

  const songCount = data.songCount > 0 ? data.songCount : null;

  const hours = duration ? Math.floor(duration / 3600) : null;
  const minutes = duration ? Math.floor((duration % 3600) / 60) : null;

  const trackMinutes = duration ? Math.floor(duration / 60) : null;
  const trackSeconds = duration ? String(duration % 60).padStart(2, "0") : null;

  const albumType = data.albumType || null;
  const releaseDate = data.releaseDate
    ? new Date(data.releaseDate).toLocaleDateString("vi-VN")
    : null;

  const artists =
    (data.artists || []).length > 0 ? data.artists.join(", ") : null;

  return `
    <div class="sticky top-24 text-white flex flex-col gap-5 items-center">

      <img id="song-thumb-display" src="${cover}" class="w-80 h-80 lg:w-100 lg:h-100 rounded-xl object-cover shadow-lg" />

      <h1 id="song-title-display" class="text-[20px] xl:text-[28px] font-bold text-center">${title}</h1>

      ${
        isPlaylist && description
          ? `<p id="song-desc-display" class="text-white/70 text-lg text-center">${description}</p>`
          : ""
      }

      <div class="text-[14px] xl:text-base text-white/80 text-center flex flex-col gap-2">

        ${
          songCount || (duration && (isAlbum || isPlaylist))
            ? `
              <div class="flex items-center justify-center">
                ${songCount ? `<span>${songCount} bài hát</span>` : ""}

                ${
                  songCount && (isAlbum || isPlaylist)
                    ? `<span class="mx-2">•</span>`
                    : ""
                }

                ${
                  duration && (isAlbum || isPlaylist)
                    ? `<span>${hours} giờ ${minutes} phút</span>`
                    : ""
                }
              </div>
            `
            : ""
        }
        ${
          isTrack && duration
            ? `<p id="song-duration-display">Thời lượng: ${trackMinutes}:${trackSeconds}</p>`
            : ""
        }

        ${
          popularity !== null
            ? `<p id="song-popularity-display">${popularity} lượt nghe</p>`
            : ""
        }

        ${
          isPlaylist && artists
            ? `<p id="song-artist-display">Các nghệ sĩ: ${artists}</p>`
            : ""
        }

        ${
          isAlbum && (albumType || releaseDate)
            ? `
              ${albumType ? `<p>Loại album: ${albumType}</p>` : ""}
              ${releaseDate ? `<p>Phát hành: ${releaseDate}</p>` : ""}
            `
            : ""
        }
      </div>
    </div>
  `;
}
