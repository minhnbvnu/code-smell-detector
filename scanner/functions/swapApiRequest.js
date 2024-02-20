async function swapApiRequest(
  method,
  path,
  body,
  { ignoreUserErrors = false } = {},
) {
  let headers = {};
  let params = { headers, method };
  if (method === 'GET') {
    params.cache = 'no-cache';
  } else if (body) {
    headers['Content-Type'] = 'application/json';
    params.body = JSON.stringify(body);
  }

  let resp = await fetch(`https://swap.sollet.io/api/${path}`, params);
  return await handleSwapApiResponse(resp, ignoreUserErrors);
}