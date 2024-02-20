function isBrowser5() {
    const isNode = typeof process === "object" && String(process) === "[object process]" && !process.browser;
    return !isNode || isElectron2();
  }