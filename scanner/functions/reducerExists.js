function reducerExists (comp) {
  try {
    fs.accessSync(`app/containers/${comp}/reducer.js`, fs.F_OK)
    return true
  } catch (e) {
    return false
  }
}