function lsbFirstWord(data) {
  return (
    ((data & 0xff) << 24) |
    ((data & 0xff00) << 8) |
    ((data >> 8) & 0xff00) |
    ((data >> 24) & 0xff)
  );
}