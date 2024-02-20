function setFileContents(path, contents) {
  if (!fileExists(path)) {
    const dirname = GLib.path_get_dirname(path)
    GLib.mkdir_with_parents(dirname, parseInt('0700', 8))
  }

  GLib.file_set_contents(path, contents)
}