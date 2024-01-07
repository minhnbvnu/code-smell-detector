function writeArray(array, buffer, transform) {
  buffer.push("[");
  let first = true;

  for (const val of array) {
    if (!first) {
      buffer.push(" ");
    } else {
      first = false;
    }

    writeValue(val, buffer, transform);
  }

  buffer.push("]");
}