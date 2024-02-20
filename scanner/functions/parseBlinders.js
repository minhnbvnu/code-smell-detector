function parseBlinders(str) {
  const parts = str.split(',')
      , blinders = []

  while (parts.length) {
    blinders.push({
      value: verifyNum(parts.shift())
    , asset: verifyHex32(parts.shift())
    , value_blinder: verifyHex32(parts.shift())
    , asset_blinder: verifyHex32(parts.shift())
    })
  }
  return blinders
}