function hasRequiredFeatures(t, requiredFeatures) {
  const unsupportedFeatures = requiredFeatures.filter((featureName) => {
    const mapping = LASP_MAP[featureName]
    return mapping == null
  })

  if (unsupportedFeatures.length > 0) {
    const featureList = unsupportedFeatures.join(', ')
    t.comment(`Missing features: ${featureList}`)

    return false
  }

  return true
}