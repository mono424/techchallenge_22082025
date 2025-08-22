import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@imgly/background-removal-node"],
      exclude: ["sharp", "onnxruntime-node"],
    },
    ssr: {
      noExternal: ["@imgly/background-removal-node"],
      external: ["sharp", "onnxruntime-node"],
    },
    define: {
      global: "globalThis",
    },
  },
});
