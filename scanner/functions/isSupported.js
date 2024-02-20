function isSupported(feature, browsers) {
  let data
  try {
    data = featureUnpack(features[feature])
  } catch(e) {
    let res = find(feature)
    if (res.length === 1) {
      data = features[res[0]]
    } else {
      throw new ReferenceError(`Please provide a proper feature name. Cannot find ${feature}`)
    }
  }

  const browserList = browserslist(browsers, {ignoreUnknownVersions: true})

  if (browserList && browserList.length > 0) {
    return browserList.map((browser) => {
      return browser.split(" ")
    })
    .every((browser) => {
      return data.stats[browser[0]] &&
        data.stats[browser[0]][browser[1]] &&
        data.stats[browser[0]][browser[1]][0] === "y"
    })
  }

  throw new ReferenceError(`browser is an unknown version: ${browsers}`)
}