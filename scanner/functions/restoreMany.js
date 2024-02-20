function restoreMany(source, olds) {
  for (const name in olds) {
    source[name] = olds[name];
  }
}