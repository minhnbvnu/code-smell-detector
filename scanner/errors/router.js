function router(req) {
  const url = new URL(req.url);
  const path = url.pathname;

  if (path.startsWith("/1-hello")) {
    return handleHello(req);
  }
  if (path.startsWith("/2-blob")) {
    return handleBlob(req);
  }
  if (path.startsWith("/2.1-file")) {
    return handleFile(req);
  }
  if (path.startsWith("/3-headers")) {
    return handleHeaders(req);
  }
  if (path.startsWith("/4-request")) {
    return handleRequest(req);
  }
  if (path.startsWith("/5-response")) {
    return handleResponse(req);
  }
  if (path.startsWith("/6-text-encoder")) {
    return handleTextEncoder(req);
  }
  if (path.startsWith("/7-text-decoder")) {
    return handleTextDecoder(req);
  }
  if (path.startsWith("/8-url")) {
    return handleURL(req);
  }
  if (path.startsWith("/8.1-search-params")) {
    return handleSearchParams(req);
  }
  if (path.startsWith("/10-atob-btoa")) {
    return handleAtobBtoA(req);
  }
  if (path.startsWith("/11-fetch")) {
    return handleFetch(req);
  }
  if (path.startsWith("/11.1-fetch-body")) {
    return handleFetchBody(req);
  }
  if (path.startsWith("/12-streams")) {
    return handleStreams(req);
  }
  if (path.startsWith("/12.1-transform-stream")) {
    return handleTransformStream(req);
  }
  if (path.startsWith("/12.2-text-encoder-stream")) {
    return handleTextEncoderStream(req);
  }
  if (path.startsWith("/12.3-text-decoder-stream")) {
    return handleTextDecoderStream(req);
  }
  if (path.startsWith("/13-performance")) {
    return handlePerformance(req);
  }
  if (path.startsWith("/14-form-data")) {
    return handleFormData(req);
  }
  if (path.startsWith("/15-timers")) {
    return handleTimers(req);
  }
  if (path.startsWith("/16-crypto")) {
    return handleCrypto(req);
  }
  if (path.startsWith("/16.1-crypto-hmac")) {
    return handleCryptoHmac(req);
  }
  if (path.startsWith("/16.2-crypto-sha")) {
    return handleCryptoSha(req);
  }
  if (path.startsWith("/17-cache")) {
    return handleCache(req);
  }
  return new Response(`Route Not Found - ${path}`, { status: 404 });
}