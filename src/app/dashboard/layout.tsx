import SideNav from '../components/SideNav';

export default function dashboardLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
      <section className="dashboard bg-white flex h-screen">
        <aside className="pt-5 shadow-[0_6px_18px_0px_rgba(0,0,0,0.06)]">
          <SideNav />
        </aside>
        {children}
      </section>
    )
  }