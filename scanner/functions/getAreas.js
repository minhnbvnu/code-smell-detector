function getAreas (city) {
  if (!city || !Object.keys(city).length) return []

  const cityKey = Number.parseInt(city.key)
  const isNotProvince = cityKey % 1e4
  const calcNum = isNotProvince ? 100 : 1e4
  const list = regionAreas.filter(val => {
    return (val.key - cityKey) < calcNum && val.key % cityKey < calcNum
  })
  // Prefecture-level city
  return list.length ? list : [city]
}