import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import WindiCSS from "vite-plugin-windicss";
import vercel from "@astrojs/vercel/serverless";
import tsconfigPaths from "vite-tsconfig-paths";

const noExternal = ["tinykeys", "fp-ts-rxjs", "fp-ts"];


if (import.meta.env.PROD) {
  // won't work locally
  noExternal.push("mappersmith");
}
export default defineConfig({
  integrations: [svelte()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [WindiCSS(), tsconfigPaths()],
    ssr: {
      noExternal: noExternal,
    },
  },
});
