'use client';

import SideNav from '../components/SideNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: Readonly<{children: React.ReactNode}>) {
  const pathname = usePathname();

    return (
      <section className="dashboard bg-white flex h-screen">
        <aside className="pt-5 shadow-[0_6px_18px_0px_rgba(0,0,0,0.06)] w-32 lg:w-[16rem]">
          <SideNav />
        </aside>
        <div className="dashboard-wrapper">
          <ToastContainer />
          <nav className="search-bar h-16 border-b border-slate-100 box-border flex flex-col justify-center relative">
            {!pathname.includes('profile') ? (
            <div className="input-group">
              <i className="absolute left-9 top-6"><MagnifyingGlassIcon className="h-4 w-4 text-blue-900" /></i>
              <input onChange={() => toast("Busca ainda não implementada!")}  type="text" className="ml-16 text-black placeholder:text-xs placeholder:text-gray-500" placeholder="Busque um agente" />
            </div>
            ) : null}
          </nav>
          {children}
        </div>
      </section>
    )
  }