function getFlags(options) {
  var flags = !options.append ? 'w' : 'a';
  if (!options.overwrite) {
    flags += 'x';
  }
  return flags;
}