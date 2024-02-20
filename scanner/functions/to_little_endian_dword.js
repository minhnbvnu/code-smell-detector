function to_little_endian_dword(str) {
  return to_little_endian_word(str) + String.fromCharCode((str >> 16) & 0xFF, (str >> 24) & 0xFF);
}