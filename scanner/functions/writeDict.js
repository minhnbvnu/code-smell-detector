function writeDict(dict, buffer, transform) {
  buffer.push("<<");

  for (const key of dict.getKeys()) {
    buffer.push(` /${(0, _core_utils.escapePDFName)(key)} `);
    writeValue(dict.getRaw(key), buffer, transform);
  }

  buffer.push(">>");
}