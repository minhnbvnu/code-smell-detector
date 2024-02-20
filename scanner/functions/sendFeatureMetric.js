function sendFeatureMetric(name) {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  const path = metricsCounterPath();

  Logger.debug("feature metric:", name);

  return promisifiedKiteAPIRequest(
    {
      path,
      method: "POST"
    },
    JSON.stringify({
      name,
      value: 1
    })
  );
}