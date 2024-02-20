function checkForUpgrade () {
  var packageLatestUrl = registryUrl() + pkg.name + '/latest'
  request(packageLatestUrl).then(function (res) {
    var latest = JSON.parse(res).version
    if (semver.gt(latest, pkg.version)) { outputUpgradeWarning(latest) }
  })
}