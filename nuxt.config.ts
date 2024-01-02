import { resolve } from "node:path";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie"),
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@hebilicious/authjs-nuxt"],
  runtimeConfig: {
    authJs: {
      secret: process.env.AUTH_SECRET,
    },
    public: {
      minioUrl: process.env.MINIO_URL,
      minioBucket: process.env.BUCKET_NAME,
    },
  },
  authJs: {
    verifyClientOnEveryRequest: true,
    guestRedirectTo: "/login",
    authenticatedRedirectTo: "/",
    baseUrl: process.env.AUTH_ORIGIN,
  },
});
