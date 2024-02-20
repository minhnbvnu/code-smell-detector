function writeEventToStreamAndClose(stream, event) {

  if (event) {
    stream.write(event);
  }

  stream.end();
}