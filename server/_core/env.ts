export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // Sendy integration
  sendyApiUrl: process.env.SENDY_API_URL ?? "",
  sendyApiKey: process.env.SENDY_API_KEY ?? "",
  sendyListId: process.env.SENDY_LIST_ID ?? "",
  // Contact email for booking notifications
  contactEmail: process.env.CONTACT_EMAIL ?? "hello@fundingclarity.co.uk",
};
