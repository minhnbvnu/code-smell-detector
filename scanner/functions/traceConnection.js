function traceConnection(areConnected) {
  return (candidates, node) => {
    const connected = new Set();

    const checkNode = n => {
      for (const candidate of candidates) {
        if (!connected.has(candidate) && areConnected(candidate, n)) {
          connected.add(candidate);
          checkNode(candidate);
        }
      }
    };

    checkNode(node);
    return connected;
  };
}