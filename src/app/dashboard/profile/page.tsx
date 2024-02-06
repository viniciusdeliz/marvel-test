'use client';

import { parseCookies } from "nookies"

export default function DashboardProfile() {
  const cookies = parseCookies();
  const token = cookies['nextauth.token'];
  const userEmail = cookies[token];

  console.log(cookies);
  return (
    <h1 className="text-xl font-bold text-blue-900">Perfil <em className="text-red-600 not-italic">/</em> <span className="font-light text-gray-500">{userEmail}</span></h1>
  )
}