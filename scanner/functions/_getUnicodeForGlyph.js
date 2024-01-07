function getUnicodeForGlyph(name, glyphsUnicodeMap) {
 let unicode = glyphsUnicodeMap[name];
 if (unicode !== undefined) {
  return unicode;
 }
 if (!name) {
  return -1;
 }
 if (name[0] === "u") {
  const nameLen = name.length;
  let hexStr;
  if (nameLen === 7 && name[1] === "n" && name[2] === "i") {
   hexStr = name.substring(3);
  } else if (nameLen >= 5 && nameLen <= 7) {
   hexStr = name.substring(1);
  } else {
   return -1;
  }
  if (hexStr === hexStr.toUpperCase()) {
   unicode = parseInt(hexStr, 16);
   if (unicode >= 0) {
    return unicode;
   }
  }
 }
 return -1;
}