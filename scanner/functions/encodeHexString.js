function encodeHexString(buffer) {
  const view = new Uint8Array(buffer);
  return Array.from(view.values())
    .map((x) => (x < 16 ? '0' : '') + Number(x).toString(16).toUpperCase())
    .join('');
}