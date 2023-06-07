import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";

export default defineConfig({
  // base: "/subdirectory/",
  plugins: [react(), yextSSG()],
  experimental: {
    renderBuiltUrl(filename, { hostId, hostType, type }) {
      if (hostType === 'js') {
        if (filename.at(0) === '/') {
          return filename.substring(1);
        }
        return filename;
      }
      return { relative: true }

      // return "hostId:" + hostId + "hostType:" + JSON.stringify(hostType) + "type:" + type + "filename:" + filename;
    }
  }
});
