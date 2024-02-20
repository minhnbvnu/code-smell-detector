function getBtoa() {
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      return (str) => window.btoa(unescape(encodeURIComponent(str)));
    } else if (typeof Buffer === "function") {
      return (str) => Buffer.from(str, "utf-8").toString("base64");
    } else {
      return () => {
        throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
      };
    }
  }