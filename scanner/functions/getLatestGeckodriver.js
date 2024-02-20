async function getLatestGeckodriver(opts, browserDriver, url) {
  const response = await got(url, { timeout: 10000, responseType: 'json' });
  if (typeof response.body.name === 'string' && response.body.name) {
    // eslint-disable-next-line no-param-reassign
    opts.drivers[browserDriver].version = response.body.name;
    return true;
  }
}