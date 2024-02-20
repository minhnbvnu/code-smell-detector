function connectControlChannel() {
  if (interactive) {
    protocol     = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    path         = (location.root + '/control').replace('//', '/').replace('/presenter','');;
    ws           = new WebSocket(protocol + location.host + path);
    ws.onopen    = function()  { connected();          };
    ws.onclose   = function()  { disconnected();       }
    ws.onmessage = function(m) { parseMessage(m.data); };
  }
}