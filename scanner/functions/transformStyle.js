function transformStyle(inPath, outPath) {
  outPath = outPath || inPath
  const text = fs.readFileSync(path.resolve(inPath), 'utf8')
  return postcss([
    autoprefixer(),
    postcssCustomProperties()
  ]).process(text, { from: undefined }).then((result) => {
    result.warnings().forEach((warn) => console.warn(warn.toString()))
    fs.writeFileSync(path.resolve(outPath), result.css)
  })
}