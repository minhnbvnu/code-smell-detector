function userStylesPath(version) {
  return GLib.build_filenamev([USER_CONFIGS, `gtk-${version}.0`, 'gtk.css'])
}