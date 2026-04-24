/// <reference types="vite/client" />

// vite-imagetools query imports
declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}
declare module "*?*as=srcset" {
  const srcset: string;
  export default srcset;
}
