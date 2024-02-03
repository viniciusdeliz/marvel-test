import Image from "next/image";
import LoginPage from "./pages/LoginPage";

export default function Home() {
  return (
      <nav className="h-[4rem] self-start pl-14">
        <Image src="./logo-pontua.svg" alt="logo-pontua" width={169} height={50} />
      </nav>
      <LoginPage />
    </main>
  );
}
