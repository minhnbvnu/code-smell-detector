async function handleSwapApiResponse(resp, ignoreUserErrors) {
  let json = await resp.json();
  if (!json.success) {
    if (ignoreUserErrors && resp.status >= 400 && resp.status < 500) {
      return null;
    }
    throw new SwapApiError(json.error, resp.status);
  }
  return json.result;
}