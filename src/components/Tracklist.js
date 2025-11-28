import { formatDuration } from "../utils/formatDuration";

export default function TrackList(tracks = []) {
  return `
    <div class="flex flex-col gap-2">
      ${tracks
        .map(
          (t, index) => `
          <a href="/songs/details/${t.id}" data-navigo
           class="flex items-center gap-4 py-3 px-4 text-white hover:bg-white/10 cursor-pointer transition group">
            <div class="w-6 text-center">${index + 1}</div>

            <div class="relative">
               <img src="${
                 t.thumbnails?.[0]
               }" class="w-12 h-12 rounded-lg object-cover" />

              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-200"></div>

              <!-- Play icon -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                <i class="fa-solid fa-play text-white text-sm"></i>
              </div>
            </div>

            <div class="flex flex-col justify-between flex-1">
              <div class="font-semibold">${t.title}</div>
              <div class="text-sm text-white/60">${t.artists.join(", ")}</div>
            </div>

            <div class="text-sm text-white/50">${formatDuration(
              t.duration
            )}</div>
          </a>
        `
        )
        .join("")}
    </div>
  `;
}
