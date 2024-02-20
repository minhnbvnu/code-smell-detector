function isValidLicense(license) {
  return !!license && validateLicense(license).validForNewPackages;
}