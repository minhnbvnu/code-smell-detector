function createWebSocket(url) {
  const client = new W3CWebSocket(
    url,
    null, // protocols
    null, // origin
    null, // headers
    null, // requestOptions
    {
      maxReceivedFrameSize: 64 * 1024 * 1024, // 64MiB
      maxReceivedMessageSize: 64 * 1024 * 1024 // 64MiB
    }
  );

  return client;
}