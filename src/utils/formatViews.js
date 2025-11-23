export function formatViews(views) {
  if (views >= 1_000_000_000) return (views / 1_000_000_000).toFixed(0) + " T";
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(0) + " Tr";
  if (views >= 1_000) return (views / 1_000).toFixed(0) + " N";
  return views;
}
