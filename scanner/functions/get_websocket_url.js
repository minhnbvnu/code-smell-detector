function get_websocket_url(endpoint) {
  var l = document.location;
  return (
    (l.protocol === "https:" ? "wss://" : "ws://") +
    l.hostname +
    (l.port != 80 && l.port != 443 ? ":" + l.port : "") +
    l.pathname.replace("/statics/individual-cluster-map.html", endpoint)
  );
}