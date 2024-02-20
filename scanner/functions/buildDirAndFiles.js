function buildDirAndFiles (folder, module, comment, buildExtra) {
  let _tempFloder = folder || module // 临时文件夹 如果目录名称未输入， 那么选择模块名称作为顶层路径
  let isNewDir
  // 如果没有这个目录那么就新建这个目录
  if (!FileUtil.isPathInDir(_tempFloder, ROOTPATH.viewsPath)) {
    rootDirPath = path.join(ROOTPATH.viewsPath, _tempFloder)
    // create dir for path
    FileUtil.createDir(rootDirPath)
    Log.success(`已创建${folder ? '目录' : "模块"}${_tempFloder}`)
    isNewDir = true
  } else {
    isNewDir = false
  }
  // 核心模块生成后生成额外页面
  // TODO: 在生成单一模块的时候还有文件处理权限的bug没有解决，所以这种个情况下暂时不能创建额外页面
  if (buildExtra) {
    // push task
    buildTasks = ["add", "info"]
  }
  // 初始化事件中心
  initEvent(folder,module,comment)
  // 生成核心模块
  let _arrays = [...generates]
  _arrays.forEach((el, i) => {
    el[1](folder, module, isNewDir, comment)
    if (i === _arrays.length -1) {
      Log.success("核心模块创建成功!")
      // 创建完毕
      routeEmitter.emit('check-task')
    }
  })
}