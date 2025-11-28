import { formatVideoDuration } from "../utils/formatDuration";

export default function VideoInfoDetails(data) {
  return `
    <div class="sticky top-24 text-white flex flex-col gap-5 items-center">

      <div class="w-full h-[70vh] aspect-video rounded-xl overflow-hidden">
        <iframe 
          id="video-iframe-display"
          class="w-full h-full"
          src="https://www.youtube.com/embed/${data.videoId}?enablejsapi=1"
          allow="autoplay; encrypted-media"
          frameborder="0"
        ></iframe>
      </div>

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
