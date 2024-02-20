function buildResponseEcho(req) {
  return new Response(req.body, {
    headers: req.headers,
  });
}