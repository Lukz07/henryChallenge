import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between">
      <Navbar/>
      <MainContent/>
    </main>
  )
}
