import Image from "next/image";
import LoginPage from "./pages/LoginPage";

export default function Home() {
  return (
    <main className="flex bg-[#00113D] min-h-screen flex-col h-full items-center p-[4.25rem] pt-[3rem]">
      <nav className="h-[4rem] self-start pl-10">
        <Image src="./logo-pontua.svg" alt="logo-pontua" width={169} height={50} />
      </nav>
      <LoginPage />
    </main>
  );
}
