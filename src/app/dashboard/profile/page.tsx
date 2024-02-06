'use client';

import { parseCookies } from "nookies"

export default function DashboardProfile() {
  const cookies = parseCookies();
  const token = cookies['nextauth.token'];
  const userEmail = cookies[token];
  const userCoolestTag = `${token}-coolest`;
  const userCoolestAgent = cookies[userCoolestTag];

  console.log(cookies);
  return (
    <section className="dashboard-profile py-5 px-6">
      <h1 className="text-xl font-bold text-blue-900">Perfil <em className="text-red-600 not-italic">/</em> <span className="font-light text-gray-500">{userEmail}</span></h1>
      <h2 className="text-gray-500">Agente favorito: {userCoolestAgent}</h2>
    </section>
  )
}