function isPdfFile(filename) {
  return typeof filename === "string" && /\.pdf$/i.test(filename);
}