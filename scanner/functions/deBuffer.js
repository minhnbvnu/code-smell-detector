function deBuffer(p) {
  return Buffer.isBuffer(p) ? p.toString() : p;
}