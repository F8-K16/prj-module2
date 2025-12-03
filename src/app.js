import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SongPlayerUI from "./components/SongPlayerUI";
import VideoPlayerUI from "./components/VideoPlayerUI";

export default async function App() {
  return `
    <header>
      ${Navbar()}
    </header>
      ${Sidebar()}
      <main id="main-view" class="relative mt-30 lg:ml-[calc(150px+5%)] lg:mr-10 pb-28"></main>
    <footer>
      ${SongPlayerUI()}
      ${VideoPlayerUI()}
    </footer>
  `;
}
