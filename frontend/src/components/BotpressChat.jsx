"use client";

import { useEffect } from "react";

export default function BotpressChat() {
  useEffect(() => {
    if (document.getElementById("botpress-inject")) return;

    const injectScript = document.createElement("script");
    injectScript.id = "botpress-inject";
    injectScript.src =
      "https://cdn.botpress.cloud/webchat/v5.0/inject.js";
    injectScript.async = true;

    const configScript = document.createElement("script");
    configScript.src =
      "https://files.bpcontent.cloud/2026/11/12/11/20261112111124-ACY6H8JJ.js";
    configScript.defer = true;

    document.body.appendChild(injectScript);
    document.body.appendChild(configScript);
  }, []);

  return null;
}