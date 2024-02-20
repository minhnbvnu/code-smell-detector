async function modelToRegion (model, levels = LEVEL_KEYS) {
  const { province, city, area, town } = model
  const region = {
    [PROVINCE_KEY]: undefined,
    [CITY_KEY]: undefined,
    [AREA_KEY]: undefined,
    [TOWN_KEY]: undefined
  }
  const inLevel = key => levels.includes(key)

  if (!province) return region

  region.province = getDetail(province)

  if (!city || !inLevel(CITY_KEY) || !region.province) return region

  region.city = getDetail(city)

  if (!area || !inLevel(AREA_KEY) || !region.city) return region

  region.area = getDetail(area)

  if (!town || !inLevel(TOWN_KEY) || !region.area) return region

  const towns = await getTowns(region.area)
  // console.log(towns)
  if (towns.length) {
    region.town = towns.find(val => val.key === town)
  }

  return region
}