function traverseFiles(_, fileName) {
  var fullpath = path.resolve(fileName)

  switch (isDir(fullpath)) {
    case true:
      if (shouldIgnorePath(fullpath, _.ignore)) {
        return []
      }
      var ignore = fu.concat(_.ignore, getIgnore(fullpath))
      var config = mergeConfig(_.config, getConfig(fullpath))
      return fu.concatMap(function (x) {
        return traverseFiles({
          ignore: ignore,
          config: config
        }, path.join(fileName, x))
      }, fs.readdirSync(fullpath))
    case false:
      return shouldLintFile(fullpath, _.ignore)
        ? [genFixForFile(fullpath, _.config)]
        : []
    case null:
      return [fu.apply(function () { return false })]
  }
}