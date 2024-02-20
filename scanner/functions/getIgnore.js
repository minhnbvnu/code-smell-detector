function getIgnore(dir) {
  var PATH_TO_IGNORE = path.join(dir, '.jshintignore')
  var ignoreRules = fs.existsSync(PATH_TO_IGNORE)
    ? fu.compact(fs.readFileSync(PATH_TO_IGNORE, 'utf-8').split('\n'))
    : []

  return fu.map(function (ignoreRule) {
    return path.join(dir, ignoreRule)
  }, ignoreRules)
}