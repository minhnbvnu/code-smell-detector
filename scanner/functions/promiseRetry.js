async function promiseRetry(fn) {
  const retryOptions = await getRetryOptions();
  return retry(fn, retryOptions);
}