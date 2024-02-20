function is_EOL(c) {
  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
}