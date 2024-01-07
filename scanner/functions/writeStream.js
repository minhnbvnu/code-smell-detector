function writeStream(stream, buffer, transform) {
  writeDict(stream.dict, buffer, transform);
  buffer.push(" stream\n");
  let string = (0, _util.bytesToString)(stream.getBytes());

  if (transform !== null) {
    string = transform.encryptString(string);
  }

  buffer.push(string);
  buffer.push("\nendstream\n");
}