async function computeDownloadUrls(options) {
  const opts = Object.assign({}, options);

  const downloadUrls = {
    selenium:
      opts.seleniumFullURL ||
      util.format(
        isSelenium4(opts.seleniumVersion) ? urls.seleniumV4 : urls.selenium,
        opts.seleniumBaseURL,
        isSelenium4(opts.seleniumVersion)
          ? `selenium-${getVersionWithZeroedPatchPart(opts.seleniumVersion)}`
          : `selenium-${opts.seleniumVersion}`,
        opts.seleniumVersion
      ),
  };
  if (opts.drivers.chrome) {
    if (opts.drivers.chrome.version === 'latest' && !opts.drivers.chrome.fullURL) {
      const { latestVersion, url } = await getPackageInfo(
        opts.drivers.chrome.version,
        opts.drivers.chrome.arch,
        opts.drivers.chrome.channel,
        opts.drivers.chrome.baseURL
      );
      opts.drivers.chrome.version = latestVersion;
      downloadUrls.chrome = url;
    } else if (
      validateMajorVersionPrefix(opts.drivers.chrome.version) &&
      Number(validateMajorVersionPrefix(opts.drivers.chrome.version)) > 114 &&
      !opts.drivers.chrome.fullURL
    ) {
      const lastVersionFromMajor = opts.drivers.chrome.major
        ? opts.drivers.chrome.major
        : await getLastChromedriverVersionFromMajor(opts.drivers.chrome.version);

      if (
        lastVersionFromMajor &&
        'downloads' in lastVersionFromMajor &&
        'chromedriver' in lastVersionFromMajor.downloads
      ) {
        const url = lastVersionFromMajor.downloads.chromedriver
          .map((m) => {
            if (m.platform === getArhType(detectBrowserPlatformCustom(opts.drivers.chrome.arch))) {
              return m.url;
            }
          })
          .filter((f) => f !== undefined);

        if (url.length) {
          downloadUrls.chrome = url[0];
          opts.drivers.chrome.version = lastVersionFromMajor.version;
        } else {
          console.log(`Wrong url: ${JSON.stringify(url)} fallback to latest`);

          const { latestVersion, packageUrl } = await getPackageInfo(
            'latest',
            opts.drivers.chrome.arch,
            opts.drivers.chrome.channel,
            opts.drivers.chrome.baseURL
          );
          opts.drivers.chrome.version = latestVersion;
          downloadUrls.chrome = packageUrl;
        }
      } else {
        console.log(`Wrong the latest from major fallback to latest`);

        const { latestVersion, url } = await getPackageInfo(
          'latest',
          opts.drivers.chrome.arch,
          opts.drivers.chrome.channel,
          opts.drivers.chrome.baseURL
        );
        opts.drivers.chrome.version = latestVersion;
        downloadUrls.chrome = url;
      }
    } else if (opts.drivers.chrome.fullURL) {
      downloadUrls.chrome = opts.drivers.chrome.fullURL;
    } else {
      const oldVersion = validateMajorVersionPrefix(opts.drivers.chrome.version);

      opts.drivers.chrome.baseURL =
        opts.drivers.chrome.baseURL && !opts.drivers.chrome.baseURL.includes('edgedl.me.gvt1.com')
          ? opts.drivers.chrome.baseURL
          : 'https://chromedriver.storage.googleapis.com';

      await resolveLatestVersion(
        opts,
        'chrome',
        oldVersion
          ? opts.drivers.chrome.baseURL + `/LATEST_RELEASE_${oldVersion}`
          : opts.drivers.chrome.baseURL + '/LATEST_RELEASE'
      );

      downloadUrls.chrome =
        opts.drivers.chrome.fullURL ||
        util.format(
          urls.chrome,
          opts.drivers.chrome.baseURL,
          opts.drivers.chrome.version,
          getChromeDriverArchitectureOld(opts.drivers.chrome.arch, opts.drivers.chrome.version)
        );
    }
  }
  if (opts.drivers.ie) {
    downloadUrls.ie =
      opts.drivers.ie.fullURL ||
      util.format(
        urls.ie,
        opts.drivers.ie.baseURL,
        opts.drivers.ie.version.slice(0, opts.drivers.ie.version.lastIndexOf('.')),
        getIeDriverArchitectureOld(opts.drivers.ie.arch),
        opts.drivers.ie.version
      );
  }
  if (opts.drivers.firefox) {
    await resolveLatestVersion(opts, 'firefox', 'https://api.github.com/repos/mozilla/geckodriver/releases/latest');
    downloadUrls.firefox =
      opts.drivers.firefox.fullURL ||
      util.format(
        urls.firefox,
        opts.drivers.firefox.baseURL,
        `v${opts.drivers.firefox.version}`,
        'geckodriver',
        `v${opts.drivers.firefox.version}`,
        getFirefoxDriverArchitectureOld(opts.drivers.firefox.arch)
      );
  }
  if (opts.drivers.edge) {
    downloadUrls.edge = opts.drivers.edge.fullURL || getEdgeDriverUrl(opts.drivers.edge.version);
  }
  if (opts.drivers.chromiumedge) {
    await resolveLatestVersion(
      opts,
      'chromiumedge',
      'https://msedgewebdriverstorage.blob.core.windows.net/edgewebdriver/LATEST_STABLE'
    );
    downloadUrls.chromiumedge =
      opts.drivers.chromiumedge.fullURL ||
      util.format(
        urls.chromiumedge,
        opts.drivers.chromiumedge.baseURL,
        opts.drivers.chromiumedge.version,
        getChromiumEdgeDriverArchitectureOld(opts.drivers.chromiumedge.arch, opts.drivers.chromiumedge.version)
      );
  }
  return downloadUrls;
}