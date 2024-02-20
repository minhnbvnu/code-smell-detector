function setXVIZConfig(config) {
  Object.assign(xvizConfig, config);

  if (Array.isArray(xvizConfig.STREAM_BLACKLIST)) {
    xvizConfig.STREAM_BLACKLIST = new Set(xvizConfig.STREAM_BLACKLIST);
  }

  notifySubscribers();
}