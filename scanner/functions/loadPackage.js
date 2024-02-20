function loadPackage (inputFile, packageName, loadDefaultPackage) {
  try {
    return inputFile.require(packageName)
  } catch (err) {
    // console.log(`Unable to locally load package ${packageName}: ${err.toString().substring(0,40)}`)
    /**
     * If the user doesn't have the package installed, fallback to the one bundled with this plugin.
     **/
    return loadDefaultPackage()
  }
}