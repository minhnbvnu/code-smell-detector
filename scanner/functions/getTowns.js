async function getTowns (area) {
  if (!area || !Object.keys(area).length) return []

  try {
    // const { default: data } = await import(townDataPath(area.key))
    const { default: data } = await import(`../town/${area.key}.json`)
    // console.log(towns)
    if (!data || typeof data !== 'object') {
      return []
    }

    return Object
      .entries(data)
      .map(([key, value]) => ({ key, value }))
  } catch (e) {
    console.warn(`The "${area.value}" area have no towns data.`)
    return []
  }
}