'use client'

import LoginModal from "../components/LoginModal";
import AgentModal from "../components/AgentModal";
import Image from "next/image";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
export default function LoginPage() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <main className="flex bg-[#00113D] min-h-screen flex-col h-full items-center p-[2rem] lg:p-[4.25rem] pt-[3rem]">
      <nav className="h-[4rem] self-start pl-10">
        <Image src="./logo-pontua.svg" alt="logo-pontua" width={169} height={50} />
      </nav>
      <section className="login-page w-full grow bg-[url('/building-bg.svg')] bg-no-repeat bg-[120px_32px] bg-[length:auto_auto] mt-12">
        { isAuthenticated ? <AgentModal /> : <LoginModal /> }
      </section>
    </main>
  );
}