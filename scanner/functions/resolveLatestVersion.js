async function resolveLatestVersion(opts, browserDriver, url) {
  if (opts.drivers[browserDriver].version === 'latest' && browserDriver !== 'chrome') {
    try {
      if (browserDriver === 'firefox') {
        if (await getLatestGeckodriver(opts, browserDriver, url)) {
          return true;
        }
        /**
         * it seems that linux releases are not for every version
         */
      } else if (browserDriver === 'chromiumedge') {
        if (await getLatestChromium(opts, browserDriver, url)) {
          if (await chromiumEdgeBundleAvailable(opts)) {
            return true;
          }
        }
      }
    } catch (_) {
      // eslint-disable-next-line no-empty
    }
    // eslint-disable-next-line no-param-reassign
    opts.drivers[browserDriver].version = opts.drivers[browserDriver].fallbackVersion;
  } else if (browserDriver === 'chrome' && !/^(\d{2,3})\.\d+\.\d+.\d+/.test(opts.drivers.chrome.version)) {
    if (await getLatestChromium(opts, browserDriver, url)) {
      return true;
    }
  }
}