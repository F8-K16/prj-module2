import Navbar from "./components/Navbar";
import PlayerUI from "./components/PlayerUI";
import Sidebar from "./components/Sidebar";

export default async function App() {
  return `
    <header>
      ${Navbar()}
    </header>
      ${Sidebar()}
      <main id="main-view" class="mt-30 md:ml-[calc(150px+5%)] lg:mr-10 pb-20"></main>
    <footer>
      ${PlayerUI()}
    </footer>
  `;
}
