function esc(str) {
  str = str.split('/').join('__SLASH__');
  str = str.split('.').join('__DOT__');
  return str;
}