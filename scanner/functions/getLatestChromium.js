async function getLatestChromium(opts, browserDriver, url) {
  try {
    const response = await got(url, { timeout: 10000 });
    // edgewebdriver latest version file contains invalid characters
    const version = response.body.replace(/\r|\n/g, '').replace(/[^\d|.]/g, '');

    // eslint-disable-next-line no-param-reassign
    opts.drivers[browserDriver].version = version;
    return true;
  } catch {
    return false;
  }
}