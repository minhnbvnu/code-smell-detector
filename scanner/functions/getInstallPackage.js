function getInstallPackage(rnPackage) {
  var packageToInstall = 'https://github.com/CanonicalLtd/react-native#ubuntu'
  var valideSemver = semver.valid(rnPackage);
  if (valideSemver) {
    packageToInstall = 'react-native@' + valideSemver;
  } else if (rnPackage) {
    // for tar.gz or alternative paths
    packageToInstall = rnPackage;
  }
  return packageToInstall;
}