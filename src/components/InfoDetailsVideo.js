import { formatVideoDuration } from "../utils/formatDuration";

export default function InfoDetailsVideo(data) {
  return `
    <div class="sticky top-24 text-white flex flex-col gap-5 items-center">
      <p class="mb-4">Đang phát</p>
      <h1 id="video-title-display" class="text-xl xl:text-3xl font-bold text-center">
        ${data.title}
      </h1>

      <div id="video-duration-display" class="text-white/60 text-sm">
        Thời lượng: ${formatVideoDuration(data.duration)}
      </div>

      ${
        data.popularity
          ? `<div id="video-popularity-display" class="text-white/60 text-sm">
               ${data.popularity} lượt xem
             </div>`
          : `<div id="video-popularity-display" class="hidden"></div>`
      }
    </div>
  `;
}
