function decodeJSONPointer(object, buffers) {
  const pointer = parseJSONPointer(object);
  if (pointer) {
    const [field, index] = pointer;
    const buffer = buffers[field] && buffers[field][index];
    if (buffer) {
      return buffer;
    }
    console.error(`Invalid JSON pointer ${object}: #/${field}/${index}`); // eslint-disable-line
  }
  return null;
}