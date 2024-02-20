function addBanner (filepath) {
  var contents = fs.readFileSync(filepath, {
    encoding: 'utf-8'
  })
  if (contents.substr(0, 3) !== '/*!') {
    fs.writeFileSync(filepath, banner + contents, {
      encoding: 'utf-8'
    })
  }
}