function utf8_decode(str) {
  try {
    return decodeURIComponent(escape(str));
  } catch (_) {
    return str;
  }
}