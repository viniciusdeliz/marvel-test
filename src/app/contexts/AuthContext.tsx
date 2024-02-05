'use client'

import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";

type User = {
  name?: string;
  email: string;
  avatar_url?: string;
}

export type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User>({ email: '' });

  const isAuthenticated = !!user;

  useEffect(() => {
    console.log('useEffect RUNNING!');
    const { 'nextauth.token': token, token: userEmail } = parseCookies()
    console.log('is there a next auth token?', token, userEmail);
    if (token) {
      recoverUserInformation(token).then(response => {
        setUser(response.user)
      })
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    console.log('sign in...', email, password);
    const { token, user } = await signInRequest({
      email,
      password,
    })

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setCookie(undefined, token, user.email, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    console.log('setting user... and token', token, user);
    setUser(user)

    // Router.push('/dashboard');
  }

  function signOut(): void {
    destroyCookie(undefined, 'nextauth.token');
    setUser({ email: '' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}