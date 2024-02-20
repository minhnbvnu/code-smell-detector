function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}