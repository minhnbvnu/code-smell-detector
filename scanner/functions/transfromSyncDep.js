function transfromSyncDep (fpath, dep, regexp, line, needDelete, opts) {
  var depPath = dep['path']
  var arg = dep['variable']
  var depFilePath = ''
  if (Util.regexps.url.test(depPath)) {
    depFilePath = depPath
    var extname = path.extname(depFilePath)
    if (!extname) {
      depFilePath += '.js'
    }
    line = line.replace(regexp, function (m, $1) {
      if (needDelete) {
        return ''
      }
      return 'var ' + arg + ' = require(\'' + depFilePath + '\');'
    })
    return {
      arg: arg,
      filePath: depFilePath,
      dep: depFilePath,
      line: line
    }
  }
  depFilePath = trackFilePath(fpath, depPath, opts)
  if (Util.existsSync(depFilePath)) {
    var depFilePathInner = depFilePath.replace(path.join(opts.appPath, '/'), '')
    var depFilePathInnerArr = depFilePathInner.split(path.sep)
    var depFilePathInnerArrLen = depFilePathInnerArr.length
    var depModuleName = depFilePathInnerArr[0]
    var depDirName = depFilePathInnerArr[1]
    var depName = path.basename(depFilePathInnerArr[depFilePathInnerArrLen - 1], path.extname(depFilePath))
    var realDep = depModuleName + '/' + depDirName + '/' + depName
    // 替换掉当前依赖
    line = line.replace(regexp, function (m, $1) {
      if (needDelete) {
        return ''
      }
      return 'var ' + arg + ' = require(\'' + realDep + '\');'
    })
    depFilePathInnerArr.splice(0, 1)
    return {
      arg: arg,
      filePath: depFilePathInnerArr.join('/'),
      dep: realDep,
      line: line
    }
  } else {
    throw new Error('文件' + fpath + '中依赖' + depPath + '不存在，请检查！')
  }
}