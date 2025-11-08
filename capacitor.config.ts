import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.bora.aitacardgame",
  appName: "AITA? Card Game",
  webDir: "dist",
  server: {
    androidScheme: "https"
  }
};

export default config;
