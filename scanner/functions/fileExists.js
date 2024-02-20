function fileExists(path) {
  return GLib.file_test(path, GLib.FileTest.EXISTS)
}