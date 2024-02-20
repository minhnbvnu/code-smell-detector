function getKeyMap(val) {
  return typeof val == "string" ? keyMap[val] : val
}