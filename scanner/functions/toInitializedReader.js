function toInitializedReader(fileName) {
  var reader = createFileReader(fileName)
  reader.next();

  return reader;
}