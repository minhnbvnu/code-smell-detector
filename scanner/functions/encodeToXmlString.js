function encodeToXmlString(str) {
  const buffer = [];
  let start = 0;

  for (let i = 0, ii = str.length; i < ii; i++) {
    const char = str.codePointAt(i);

    if (0x20 <= char && char <= 0x7e) {
      const entity = XMLEntities[char];

      if (entity) {
        if (start < i) {
          buffer.push(str.substring(start, i));
        }

        buffer.push(entity);
        start = i + 1;
      }
    } else {
      if (start < i) {
        buffer.push(str.substring(start, i));
      }

      buffer.push(`&#x${char.toString(16).toUpperCase()};`);

      if (char > 0xd7ff && (char < 0xe000 || char > 0xfffd)) {
        i++;
      }

      start = i + 1;
    }
  }

  if (buffer.length === 0) {
    return str;
  }

  if (start < str.length) {
    buffer.push(str.substring(start, str.length));
  }

  return buffer.join("");
}