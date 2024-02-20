function cleanObjectName(name) {
  return makeKeyword(name.replace( /^(.+):.*$/, "$1"));
}