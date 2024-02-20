function getCountUnderProvince (provinceMap) {
  let sum = 0
  for (let key of Object.keys(provinceMap)) {
    sum += provinceMap[key]
  }
  return sum
}