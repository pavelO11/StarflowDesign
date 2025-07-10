/// <reference types="vite/client" />

import Lenis from 'lenis'

declare global {
  interface Window {
    lenis?: Lenis;
  }
  interface ImportMetaEnv {
    readonly VITE_TELEGRAM_BOT_TOKEN: string;
    readonly VITE_TELEGRAM_CHAT_ID: string;
  }
}