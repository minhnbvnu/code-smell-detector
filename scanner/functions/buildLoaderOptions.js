function buildLoaderOptions() {
  const url = new URL(window.location);

  // I prefer to work with an object
  const params = {};
  for (const [k, v] of url.searchParams.entries()) {
    if (Number.isNaN(Number.parseFloat(v))) {
      params[k] = v;
    } else {
      params[k] = Number.parseFloat(v);
    }
  }

  const {
    // These will not be passed through to server request
    server = 'ws://localhost:3000',
    worker = true,
    // These will be passed through to server request
    log = 'mock',
    profile,
    timestamp,
    duration,
    ...passthroughOptions
  } = params;

  const options = {
    // Any options not handled directly will just pass through
    ...passthroughOptions,

    logGuid: log,
    serverConfig: {
      defaultLogLength: 30,
      serverUrl: `${server}${url.pathname}`
    },
    worker: worker !== 'false',
    maxConcurrency: 4
  };

  if (profile) {
    options.logProfile = profile;
  }
  if (timestamp) {
    options.timestamp = timestamp;
  }
  if (duration) {
    options.duration = duration;
  }
  if (__IS_LIVE__) {
    options.bufferLength = params.bufferLength || 10;
  }

  return options;
}