function getAllJsMapUri(basePath) {
  let pathUri = path.resolve(basePath)
  let jsMapUriSet = new Set()
  let currentDirList = [pathUri]
  let nextDirList = []
  while (currentDirList.length > 0) {
    for (currentPath of currentDirList) {
      let filenameList = fs.readdirSync(currentPath)
      for (let filename of filenameList) {
        let uri = path.resolve(currentPath, filename)
        let fsStat = fs.statSync(uri)
        if (fsStat.isDirectory()) {
          nextDirList.push(uri)
          continue
        }
        if (fsStat.isFile()) {
          if (filename.endsWith('.js.map')) {
            jsMapUriSet.add(uri)
          }
        }
      }
    }
    currentDirList = nextDirList
    nextDirList = []
  }
  // 得到所有js.map文件的地址
  return [...jsMapUriSet.values()]
}