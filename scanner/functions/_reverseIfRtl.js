function reverseIfRtl(chars) {
 const charsLength = chars.length;
 if (charsLength <= 1 || !isRTLRangeFor(chars.charCodeAt(0))) {
  return chars;
 }
 const buf = [];
 for (let ii = charsLength - 1; ii >= 0; ii--) {
  buf.push(chars[ii]);
 }
 return buf.join("");
}