function writeValue(value, buffer, transform) {
  if ((0, _primitives.isName)(value)) {
    buffer.push(`/${(0, _core_utils.escapePDFName)(value.name)}`);
  } else if ((0, _primitives.isRef)(value)) {
    buffer.push(`${value.num} ${value.gen} R`);
  } else if (Array.isArray(value)) {
    writeArray(value, buffer, transform);
  } else if (typeof value === "string") {
    if (transform !== null) {
      value = transform.encryptString(value);
    }

    buffer.push(`(${(0, _util.escapeString)(value)})`);
  } else if (typeof value === "number") {
    buffer.push(numberToString(value));
  } else if ((0, _primitives.isDict)(value)) {
    writeDict(value, buffer, transform);
  } else if ((0, _primitives.isStream)(value)) {
    writeStream(value, buffer, transform);
  }
}