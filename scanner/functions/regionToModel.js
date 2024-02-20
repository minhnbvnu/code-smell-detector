function regionToModel (region) {
  if (!region) return {}
  return Object.fromEntries(
    Object
      .entries(region)
      .map(([key, value]) => [key, value && value.key])
  )
}