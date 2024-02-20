function getCities (province) {
  if (!province || !Object.keys(province).length) return []

  const list = regionCities.filter(val => {
    const num = Number.parseInt(province.key)
    return (val.key - num) < 1e4 && (val.key % num) < 1e4
  })
  // Municipalities directly under the central government
  return list.length ? list : [province]
}