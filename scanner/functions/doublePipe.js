function doublePipe(one, two) {
  one.onMessage.addListener(lOne);

  function lOne(message) {
    two.postMessage(message);
  }

  two.onMessage.addListener(lTwo);

  function lTwo(message) {
    one.postMessage(message);
  }

  function shutdown() {
    one.onMessage.removeListener(lOne);
    two.onMessage.removeListener(lTwo);
    one.disconnect();
    two.disconnect();
  }

  one.onDisconnect.addListener(shutdown);
  two.onDisconnect.addListener(shutdown);
}