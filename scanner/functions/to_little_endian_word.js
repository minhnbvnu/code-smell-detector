function to_little_endian_word(str) {
  return to_byte(str) + String.fromCharCode((str >> 8) & 0xFF);
}