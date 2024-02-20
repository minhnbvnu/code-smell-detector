function extractEncodingFromText(text) {
  const matchEncoding = text.match(
    /^<\?xml[^>]*[ \t\r\n]encoding="([^"]*)"[^>]*\?>/i
  );
  if (matchEncoding) {
    return matchEncoding[1];
  }
}