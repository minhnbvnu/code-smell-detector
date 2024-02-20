function getRequestData(requestUrl) {
  const req = new URL(requestUrl, 'https://localhost');
  const params = {};
  for (const [k, v] of req.searchParams.entries()) {
    params[k] = v;
  }

  return {
    path: req.pathname,
    params
  };
}