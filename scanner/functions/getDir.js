function getDir() {
  return Gio.File.new_for_uri(import.meta.url).get_parent()
}