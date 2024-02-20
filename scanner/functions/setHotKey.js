function setHotKey () {
  init()
  let keys = []
  Object.keys(keyMap).forEach(key => {
    keys.push(keyMap[key])
  })
  keys.forEach(item => {
    globalShortcut.register(item['key'], item['func'])
  })
}