function pad(str, len) {
  str = String(str);
  return Array(len - str.length + 1).join(' ') + str;
}