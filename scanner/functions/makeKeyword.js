function makeKeyword(text) {
  return text.replace( /[^A-Za-z0-9_-]+/g , '_' );
}