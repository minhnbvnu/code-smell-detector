function getSocketRequestParams(options) {
  const {
    logGuid,
    logProfile = DEFAULT_LOG_PROFILE,
    duration: requestedDuration,
    timestamp,
    serverConfig,
    bufferLength = DEFAULT_BUFFER_LENGTH[getXVIZConfig().TIMESTAMP_FORMAT],
    // These are parent class options we want to filter
    maxConcurrency,
    WebSocketClass,
    ...passThroughOptions
  } = options;

  // set duration overrides & defaults
  const duration = requestedDuration || serverConfig.defaultLogLength;

  assert(logGuid && duration);

  const queryParams = {
    ...passThroughOptions,
    ...serverConfig.queryParams,
    log: logGuid,
    profile: logProfile
  };

  if (duration) {
    queryParams.duration = duration;
  }
  if (timestamp) {
    queryParams.timestamp = timestamp;
  }

  const retryAttempts = Number.isInteger(serverConfig.retryAttempts)
    ? serverConfig.retryAttempts
    : DEFAULT_RETRY_ATTEMPTS;

  const qs = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');

  return {
    url: `${serverConfig.serverUrl}?${qs}`,
    logGuid,
    logProfile,
    duration,
    timestamp,
    bufferLength,
    retryAttempts,
    serverConfig
  };
}