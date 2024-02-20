function hkLightLevel (v) {
  let l = v ? Math.pow(10, (v - 1) / 10000) : 0.0001
  l = Math.round(l * 10000) / 10000
  return l > 100000 ? 100000 : l < 0.0001 ? 0.0001 : l
}