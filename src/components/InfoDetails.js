export default function InfoDetails(data) {
  const isAlbum = !!data.albumType;
  const isPlaylist = !data.albumType;

  const cover = data.thumbnails?.[0];
  const title = data.title;
  const description = data.description || "";

  const songCount = data.songCount > 0 ? data.songCount : null;
  const duration = data.duration > 0 ? data.duration : null;
  const hours = duration ? Math.floor(duration / 3600) : null;
  const minutes = duration ? Math.floor((duration % 3600) / 60) : null;

  const albumType = data.albumType || null;
  const releaseDate = data.releaseDate
    ? new Date(data.releaseDate).toLocaleDateString("vi-VN")
    : null;

  const artists =
    (data.artists || []).length > 0 ? data.artists.join(", ") : null;

  return `
    <div class="sticky top-24 text-white flex flex-col gap-5 items-center">

      <img src="${cover}" class="rounded-xl w-full object-cover" />

      <h1 class="text-[20px] xl:text-[28px] font-bold text-center">${title}</h1>

      ${
        isPlaylist && description
          ? `<p class="text-white/70 text-lg text-center">${description}</p>`
          : ""
      }

      <div class="text-[14px] xl:text-base text-white/80 text-center flex flex-col gap-2">

        ${
          songCount || duration
            ? `
              <div class="flex items-center justify-center">
                ${songCount ? `<span>${songCount} bài hát</span>` : ""}
                ${songCount && duration ? `<span class="mx-2">•</span>` : ""}
                ${duration ? `<span>${hours} giờ ${minutes} phút</span>` : ""}
              </div>
            `
            : ""
        }

        ${isPlaylist && artists ? `<p>Các nghệ sĩ: ${artists}</p>` : ""}

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
