function getFileContents(path) {
  if (fileExists(path)) {
    const contents = GLib.file_get_contents(path)
    return String.fromCharCode(...contents[1])
  } else {
    return ''
  }
}