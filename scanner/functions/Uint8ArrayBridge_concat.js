function Uint8ArrayBridge_concat(pair) {
  return Uint8ArrayBridge(ArrayBridge_concat(pair.map(ArrayBridge)));
}