function writeShim (src, to, opts) {
  opts = Object.assign({}, DEFAULT_OPTIONS, opts)
  const defaultArgs = opts.preserveSymlinks ? '--preserve-symlinks' : ''
  // make a cmd file and a sh script
  // First, check if the bin is a #! of some sort.
  // If not, then assume it's something that'll be compiled, or some other
  // sort of script, and just call it directly.
  return mkdir(path.dirname(to))
    .then(() => {
      return fs.readFile(src, 'utf8')
        .then(data => {
          const firstLine = data.trim().split(/\r*\n/)[0]
          const shebang = firstLine.match(shebangExpr)
          if (!shebang) return writeShim_(src, to, Object.assign({}, opts, {args: defaultArgs}))
          const prog = shebang[1]
          const args = (shebang[2] && ((defaultArgs && (shebang[2] + ' ' + defaultArgs)) || shebang[2])) || defaultArgs
          return writeShim_(src, to, Object.assign({}, opts, {prog, args}))
        })
        .catch(() => writeShim_(src, to, Object.assign({}, opts, {args: defaultArgs})))
    })
}