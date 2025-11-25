export default function HScroll(itemsHtml) {
  return `
    <div class="flex gap-12 lg:gap-6 overflow-x-auto pb-10 lg:pb-14 scrollbar">
      ${itemsHtml}
    </div>
  `;
}
