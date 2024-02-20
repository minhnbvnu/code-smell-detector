function genericizeJSONPath(path = "") {
  return path.replace(/\[\d+\]/g, "[*]");
}