function transfromLazyDep (fpath, dep, regexp, line, opts) {
  var depPath = dep['path'] || ''
  var arg = dep['variable'] || ''
  depPath = depPath.replace(/\'|\"|\s/g, '')
  arg = arg.replace(/\'|\"|\s/g, '')
  var depPathArr = depPath.split(',')
  var argArr = arg.split(',')
  var depList = []
  var newDepPath = ''
  depPathArr.forEach(function (item, index) {
    var depFilePath
    if (Util.regexps.url.test(item)) {
      depFilePath = item
      var extname = path.extname(depFilePath)
      if (!extname) {
        depFilePath += '.js'
      }
      newDepPath += '\'' + depFilePath + '\''
      depList.push({
        arg: argArr[index],
        filePath: depFilePath,
        dep: depFilePath
      })
    } else {
      depFilePath = trackFilePath(fpath, item, opts)
      if (Util.existsSync(depFilePath)) {
        var depFilePathInner = depFilePath.replace(path.join(opts.appPath, '/'), '')
        var depFilePathInnerArr = depFilePathInner.split(path.sep)
        var depModuleName = depFilePathInnerArr[0]
        var depDirName = depFilePathInnerArr[1]
        var depName = path.basename(depFilePathInnerArr[depFilePathInnerArrLen - 1], path.extname(depFilePath))
        var realDep = depModuleName + '/' + depDirName + '/' + depName
        newDepPath += '\'' + realDep + '\''
        depFilePathInnerArr.splice(0, 1)
        depList.push({
          arg: argArr[index],
          filePath: depFilePathInnerArr.join('/'),
          dep: realDep
        })
      } else {
        throw new Error('文件' + fpath + '中依赖' + depPath + '不存在，请检查！')
      }
    }
    if (index < depPathArr.length - 1) {
      newDepPath += ' ,'
    }
  })
  newDepPath = '[' + newDepPath + ']'
  // 替换掉当前依赖
  line = line.replace(regexp, function (m, $1) {
    return 'require.async(' + newDepPath + ', function (' + dep['variable'] + ')'
  })
  return {
    line: line,
    depList: depList
  }
}