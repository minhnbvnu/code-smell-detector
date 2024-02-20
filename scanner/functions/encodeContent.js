function encodeContent(text) {
  return text.replace(/[*_`]/g, '\\$&');
}