async function echoHandler(req) {
  const data = {
    headers: req.headers.items,
    method: req.method,
    body: req.body,
  };

  const body = JSON.stringify(data, 0, 2);
  const headers = new Headers(req.headers.toList());
  headers.set('content-type', 'application/json');
  return new Response(body);
}