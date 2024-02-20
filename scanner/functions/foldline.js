function foldline(aLine) {
  let result = "";
  let line = aLine || "", pos = 0, line_length = 0;
  //pos counts position in line for the UTF-16 presentation
  //line_length counts the bytes for the UTF-8 presentation
  while (line.length) {
    let cp = line.codePointAt(pos);
    if (cp < 128) ++line_length;
    else if (cp < 2048) line_length += 2;//needs 2 UTF-8 bytes
    else if (cp < 65536) line_length += 3;
    else line_length += 4; //cp is less than 1114112
    if (line_length < ICALmodule.foldLength + 1)
      pos += cp > 65535 ? 2 : 1;
    else {
      result += ICALmodule.newLineChar + " " + line.slice(0, Math.max(0, pos));
      line = line.slice(Math.max(0, pos));
      pos = line_length = 0;
    }
  }
  return result.slice(ICALmodule.newLineChar.length + 1);
}