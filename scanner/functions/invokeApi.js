function invokeApi(requestOptions, options = {}) {
  const {
    shouldRetry = null,
    shouldRetryOnError = null,
    retryDelay = 800,
    errorHandler = handleError
  } = options;
  return new Promise((resolve, reject) => {
    // make sure `invoke` can be only called at most every retryDelay
    const invoke = _.throttle(
      () => {
        request(requestOptions)
          .then(v => {
            if (shouldRetry && shouldRetry(v)) {
              return _.delay(invoke, retryDelay);
            }
            resolve(v);
          })
          .catch(e => {
            if (shouldRetryOnError && shouldRetryOnError(e)) {
              return _.delay(invoke, retryDelay);
            }
            if (errorHandler) {
              _.attempt(errorHandler, e);
            }
            reject(e);
          });
      },
      retryDelay,
      {
        leading: true,
        trailing: false
      }
    );
    invoke();
  });
}