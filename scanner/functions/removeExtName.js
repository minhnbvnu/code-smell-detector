function removeExtName(filepath) {
  let ext = path.extname(filepath);
  while (ext) {
    filepath = path.basename(filepath, ext);
    ext = path.extname(filepath);
  }
  return filepath;
}