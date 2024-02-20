function setGlobalKey (type, keys) {
  var status
  if (keys.length < 1 || keys[0].length <= 1) {
    status = 'FAIL'
  } else {
    try {
      globalShortcut.register(keys.join(' + '), () => {})
      if (globalShortcut.isRegistered(keys.join(' + ')) === true) {
        let tostoreSetting = {}
        keyMap[type]['key'] = keys.join(' + ')
        Object.keys(keyMap).forEach(k => {
          tostoreSetting[k] = {
            key: keyMap[k]['key']
          }
        })
        config.default.setItem('keyMap', tostoreSetting)
        status = 'SUCCESS'
      } else {
        status = '与 系统 / 其他程序 快捷键冲突'
      }
    } catch (e) {
      status = '快捷键没有设置完整'
    }
  }
  resetHotKey()
  return status
}