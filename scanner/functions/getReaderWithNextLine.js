function getReaderWithNextLine(readers) {
  readers.sort(readerIsNext);
  return readers[0];
}