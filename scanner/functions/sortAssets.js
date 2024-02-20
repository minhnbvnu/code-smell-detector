function sortAssets (assets) {
  return Object.keys(assets).map(i => ({ [i]: assets[i] })).sort((a, b) => {
    if (a.manifest) {
      return -1
    }

    if (b.manifest) {
      return 1
    }

    return 0
  })
}