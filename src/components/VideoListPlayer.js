import { formatDuration } from "../utils/formatDuration";

export default function VideoListPlayer(videos = []) {
  return `
    <div class="flex flex-col gap-2">

      ${videos
        .map(
          (v, index) => `
          <div class="video-item flex items-center gap-4 p-3 rounded-lg text-white hover:bg-white/10 cursor-pointer transition group"
               data-video-id="${v.id}"
               data-youtube-id="${v.videoId}">

            <div class="w-6 text-center">${index + 1}</div>

            <div class="relative">
              <img src="${v.thumbnails[0]}" 
                   class="w-12 h-12 rounded-lg object-cover" />

              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <i class="fa-solid fa-play text-white text-sm"></i>
              </div>
            </div>

            <div class="flex flex-col flex-1">
              <div class="font-semibold">${v.title}</div>
            </div>

            <div class="text-sm text-white/50">${formatDuration(
              v.duration
            )}</div>

          </div>
        `
        )
        .join("")}

    </div>
  `;
}
