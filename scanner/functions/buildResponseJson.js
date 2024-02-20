async function buildResponseJson(req) {
  const reqBody = await requestBodyToString(req);

  const data = {
    url: req.url,
    method: req.method,
    headers: Object.fromEntries(req.headers),
    body: reqBody,
  };
  const body = JSON.stringify(data, null, 2);
  return new Response(body, {
    headers: { "content-type": "application/json" },
  });
}