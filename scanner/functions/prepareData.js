function prepareData (data) {
  const params = {}

  for (const key in data) {
    if (key !== 'attachment' && key !== 'inline' && isOk(data[key])) {
      const value = getDataValue(key, data[key])

      if (isOk(value)) {
        params[key] = value
      }
    } else {
      params[key] = data[key]
    }
  }

  return params
}