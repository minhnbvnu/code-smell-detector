function getMixinKey (orig) {
  let temp = ''
  mixinKeyEncTab.forEach((n) => {
    temp += orig[n]
  })
  return temp.slice(0, 32)
}