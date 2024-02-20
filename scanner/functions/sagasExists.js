function sagasExists (comp) {
  try {
    fs.accessSync(`app/containers/${comp}/sagas.js`, fs.F_OK)
    return true
  } catch (e) {
    return false
  }
}