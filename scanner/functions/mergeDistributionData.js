function mergeDistributionData (distributionSource, distributionDist, processCityData = (cityDataDist, cityDataSource) => { return cityDataDist + cityDataSource }) {
  let finalDistribution = _.clone(distributionDist)
  for (let country of Object.keys(distributionSource)) {
    if (_.has(distributionDist, country) === false) {
      // 没有就直接更新上
      _.set(finalDistribution, [country], distributionSource[country])
      continue
    }
    let countryDistributionSource = distributionSource[country]
    let countryDistributionDist = distributionDist[country]
    for (let province of Object.keys(countryDistributionSource)) {
      if (_.has(countryDistributionDist, province) === false) {
        _.set(finalDistribution, [country, province], distributionSource[country][province])
        continue
      }
      let provinceDistributionSource = countryDistributionSource[province]
      let provinceDistributionDist = countryDistributionDist[province]
      for (let city of Object.keys(provinceDistributionSource)) {
        if (_.has(provinceDistributionDist, city) === false) {
          _.set(finalDistribution, [country, province, city], distributionSource[country][province][city])
          continue
        }
        let cityDistributionSource = provinceDistributionSource[city]
        let cityDistributionDist = provinceDistributionDist[city]
        _.set(finalDistribution, [country, province, city], processCityData(cityDistributionDist, cityDistributionSource))
      }
    }
  }
  return finalDistribution
}