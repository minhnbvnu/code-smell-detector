function makeDocumentSlug(rawName) {
  return makeKeyword(rawName.replace(/ +/g,"-"));
}