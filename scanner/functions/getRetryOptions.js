async function getRetryOptions() {
  const profile = await getProfile();
  const retryOptions = {
    retries: profile.retries,
    factor: 2,
    minTimeout: 1 * 1000,
    randomize: true
  };

  return retryOptions;
}