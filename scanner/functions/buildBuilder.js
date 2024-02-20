function buildBuilder(client, opts) {
   return websocket(opts.url, ['mqttv3.1'], opts.websocketOptions);
}