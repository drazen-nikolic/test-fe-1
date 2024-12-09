/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  // Add other environment variables you use here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}