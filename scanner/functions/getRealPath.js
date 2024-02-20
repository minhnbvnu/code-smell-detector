function getRealPath(filepath) {
  if (isWindows && filepath.startsWith('\\\\?\\')) {
    // Remove win32 file namespace prefix \\?\
    return filepath[4].toUpperCase() + filepath.slice(5);
  }
  return filepath;
}