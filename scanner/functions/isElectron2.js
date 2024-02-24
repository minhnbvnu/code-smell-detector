function isElectron2(mockUserAgent) {
    if (typeof window !== "undefined" && typeof window.process === "object" && window.process.type === "renderer") {
      return true;
    }
    if (typeof process !== "undefined" && typeof process.versions === "object" && Boolean(process.versions.electron)) {
      return true;
    }
    const realUserAgent = typeof navigator === "object" && typeof navigator.userAgent === "string" && navigator.userAgent;
    const userAgent = mockUserAgent || realUserAgent;
    if (userAgent && userAgent.indexOf("Electron") >= 0) {
      return true;
    }
    return false;
  }