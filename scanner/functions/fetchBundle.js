function fetchBundle(config, url) {
  return config.requestManager.request({
    url,
    buffer: true
  });
}