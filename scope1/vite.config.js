import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [
    // legacy(),
    // commonjs(),
    // viteCommonjs(),
    // cjsInterop({
    //   dependencies: [
    //     "@yext/react-components/**"
    //   ]
    // }),
    imagetools(),
    react(),
    yextSSG(),
  ],
  css: {
    postcss: "src",
  },
  // build: {
  //   assetsInlineLimit: 0,
  // },

  // ssr: {
  //   noExternal: ["@yext/react-components"]
  // },
  // optimizeDeps: {
  //   exclude: ["@yext/react-components"],
  // },
  // build: {
  //   commonjsOptions: {
  //     esmExternals: ["@yext/react-components"]
  //   },
  // }
  // optimizeDeps: {
  //   exclude: ["@yext/chat-ui-react"],
  //   // esbuildOptions: {
  //   //   format: "cjs"
  //   // }
  // },
  // build: {
  //   assetsDir: "subdirectory/assets",
  //   // commonjsOptions: {
  //   //   esmExternals: ["@yext/chat-ui-react"]
  //   // },
  // }
  // ssr: {
  //   noExternal: ["@saatva-bits/pattern-library.components.button"],
  // },
});
