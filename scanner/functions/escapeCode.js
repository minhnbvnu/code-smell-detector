function escapeCode (str) {
  return str.replace(/'/g, "\'").replace(/ *[\r\n]+ */g, '\n').replace(/\\/g, "\\\\").replace(/ +/g, ' ');
}