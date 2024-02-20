function _detectDar (f) {
  if (!fs.existsSync(f)) return
  if (!path.isAbsolute(f)) {
    f = path.join(process.cwd(), f)
  }
  let stat = fs.statSync(f)
  if (stat) {
    if (stat.isFile() && _isDAR(f)) {
      return {
        type: 'packed',
        file: f
      }
    } else if (stat.isDirectory()) {
      // poor-man's check if the directory is an unpacked DAR
      let manifest = path.join(f, 'manifest.xml')
      if (fs.existsSync(manifest)) {
        return {
          type: 'unpacked',
          file: f
        }
      }
    }
  }
}