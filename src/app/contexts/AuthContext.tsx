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
  signOut: (token: string) => void;
  setCoolestChar: (char: string) => void;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User>({ email: '' });

  const isAuthenticated = !!user.email;

  useEffect(() => {
    console.log('useEffect RUNNING!');
    const { 'nextauth.token': token, token: userEmail } = parseCookies();
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
    setUser(user);
  }

  function setCoolestChar(char: string) {
    const { 'nextauth.token': val } = parseCookies();
    setCookie(undefined, `${val}-coolest`, char, {
      maxAge: 60 * 60 * 1,
    });
  }

  function signOut(token: string): void {
    destroyCookie(undefined, token);
    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, `${token}-coolest`);
    setUser({ email: '' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, setCoolestChar }}>
      {children}
    </AuthContext.Provider>
  )
}