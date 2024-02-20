function availableLevels (props) {
  const result = [PROVINCE_KEY]
  const levels = [props.city, props.area, props.town]

  for (let i = 0; i < levels.length; i++) {
    if (levels[i]) {
      result.push(LEVEL_KEYS[i + 1])
    } else {
      return result
    }
  }
  return result
}