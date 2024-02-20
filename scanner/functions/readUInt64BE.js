function readUInt64BE(start) {
  return new Uint64BE(this, start).toNumber();
}