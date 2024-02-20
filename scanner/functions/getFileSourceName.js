function getFileSourceName(file) {
  return file.name
    .replace(/@\d+(?=\.|$)/, "") // strip Observable file version number
    .replace(/\.\w+$/, ""); // strip file extension
}