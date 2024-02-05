export default function dashboardLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
      <section className="dashboard bg-white pt-8 px-3">
        {children}
      </section>
    )
  }