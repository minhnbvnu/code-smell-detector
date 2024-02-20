function isValidPackageName(name) {
  return name.match(/^[$A-Z_][0-9A-Z_$]*$/i);
}