function stringToUTF16BEString(str) {
  const buf = ["\xFE\xFF"];

  for (let i = 0, ii = str.length; i < ii; i++) {
    const char = str.charCodeAt(i);
    buf.push(String.fromCharCode(char >> 8 & 0xff));
    buf.push(String.fromCharCode(char & 0xff));
  }

  return buf.join("");
}