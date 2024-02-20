function jade_encode_char(c) {
  return jade_encode_html_rules[c] || c;
}