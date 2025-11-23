export default function Section(title, content) {
  if (!content) return "";
  return `
    <section class="mt-12">
      <h2 class="text-[22px] md:text-[32px] lg:text-[45px] text-white font-bold mb-4">
        ${title}
      </h2>
      ${content}
    </section>
  `;
}
