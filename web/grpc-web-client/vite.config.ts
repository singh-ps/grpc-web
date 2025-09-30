import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  base: "/",
  server: { port: 8080 },
  plugins: [
    commonjs(), // handles CJS in node_modules and in your generated files
  ],
  build: {
    target: "es2020",
    outDir: "dist",
  },
  optimizeDeps: {
    include: ["google-protobuf", "grpc-web"],
  },
});
