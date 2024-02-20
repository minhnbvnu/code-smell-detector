function systemLocale() {
    if (sysLocaleCache) {
      return sysLocaleCache;
    } else if (hasIntl()) {
      var computedSys = new Intl.DateTimeFormat().resolvedOptions().locale; // node sometimes defaults to "und". Override that because that is dumb

      sysLocaleCache = !computedSys || computedSys === "und" ? "en-US" : computedSys;
      return sysLocaleCache;
    } else {
      sysLocaleCache = "en-US";
      return sysLocaleCache;
    }
  }