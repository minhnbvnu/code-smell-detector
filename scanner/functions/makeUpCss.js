function makeUpCss(conf) {
  const cssList = []
  conf.fields.forEach(el => addCss(cssList, el))
  return cssList.join('\n')
}