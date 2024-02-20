function filePath(parts) {
  const parse = part => part ? part.replace(/^@/, '') : ''
  const root  = isAbsPath(parts) ? [] : [Convenience.getPath()]
  const paths = root.concat(parts).map(parse)

  return GLib.build_filenamev(paths)
}