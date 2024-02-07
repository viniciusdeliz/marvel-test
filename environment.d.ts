import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      apikey: string;
    }
  }
}