function bundleJsFiles () {
  return concat(jsFiles)
    .then((output) => {
      const uglified = UglifyJS.minify(output)
      if (uglified.error) {
        throw new Error(uglified.error)
      }
      return uglified.code
    })
}