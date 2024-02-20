function getPathParts(filepath) {
  // path.toNamespacedPath is only for Win32 system.
  // on other platform, it returns the path unmodified.
  const parts = path.toNamespacedPath(path.resolve(filepath)).split(path.sep);
  parts.shift();
  if (isWindows) {
    // parts currently looks like ['', '?', 'c:', ...]
    parts.shift();
    const q = parts.shift(); // should be '?'
    // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file?redirectedfrom=MSDN#win32-file-namespaces
    // Win32 File Namespaces prefix \\?\
    const base = '\\\\' + q + '\\' + parts.shift().toLowerCase();
    parts.unshift(base);
  }
  if (parts[parts.length - 1] === '') {
    parts.pop();
  }
  return parts;
}