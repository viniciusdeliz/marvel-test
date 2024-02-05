'use client'
import Link from "next/link";
import * as HIcons from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const links = [
  {
    href: '/dashboard',
    title: 'Home',
    icon: 'RectangleGroupIcon',
  },
  {
    href: '/profile',
    title: 'Perfil',
    icon: 'UserIcon',
  },
];

export default function SideNav() {
  const pathname = usePathname();
  const {...icons} = HIcons;
  const ExitIcon = icons['ArrowUturnLeftIcon'];
  return (
    <div className="sidenav-wrapper w-[16rem]">
      <section className="nav-header border-b border-slate-100 pb-4 pl-6">
        <img src="./logo-pontua-dark.svg" />
      </section>
      <section className="nav-links border-b border-slate-100 flex flex-col text-xs font-medium pl-6">
        {links.map((el, index) => {
          const {...icons}: any = HIcons;
          const CustomIcon = icons[el.icon];
          const isActiveLink = pathname === el.href;
          return (
            <Link key={index} className={`${isActiveLink ? 'active text-orange-600' : ''} mt-2 pt-2 last:pb-5`} href='/dashboard'>
              <CustomIcon className="w-5 h-5 inline-block mr-3" />
              {el.title}
            </Link>
          )
        })}
      </section>
      <section className="nav-action py-8 text-xs pl-6">
      <Link href='/'><ExitIcon className="w-5 h-5 inline-block mr-3" />Sair</Link>
      </section>
    </div>
  )
}