import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "Parapara",
  description: "LLM 기반 문서 번역 크롬 확장",
  version: "0.0.1",
  action: {
    default_popup: "src/popup.html",
    default_icon: "icons/icon128.png",
  },
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.ts"],
      all_frames: true, 
    },
  ],
  permissions: ["contextMenus", "storage", "tabs", "scripting"],
  host_permissions: ["<all_urls>"],
  icons: {
    128: "icons/icon128.png",
  },
});
