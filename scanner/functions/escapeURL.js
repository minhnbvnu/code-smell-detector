function escapeURL(str) {
  if (URL_ESCAPE_TEST_RE.test(str)) {
    return str.replace(URL_ESCAPE_REPLACE_RE, replaceUnsafeCharURL);
  }
  return str;
}