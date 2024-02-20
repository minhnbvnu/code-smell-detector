function readBigUInt64LE(buffer, offset = 0) {
  const lo = buffer.readUInt32LE(offset);
  const hi = buffer.readUInt32LE(offset + 4);
  return BigInt(lo) + (BigInt(hi) << BigInt(32));
}