function readInt64BE(start) {
  return new Int64BE(this, start).toNumber();
}