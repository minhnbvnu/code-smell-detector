function getTestVfsRootDir () {
  // ATTENTION: these are hard-coded according to the different
  // test builds we are using
  // in the browser test-suite we bundle assets into an extra 'test' folder
  // in electron we can access the original files directly via relative path to the root
  if (platform.inElectron) {
    return '../../test/fixture/'
  } else {
    return './test/fixture/'
  }
}