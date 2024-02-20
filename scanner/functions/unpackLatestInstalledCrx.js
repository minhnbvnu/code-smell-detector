function unpackLatestInstalledCrx(id, purge) {
  // happily throw up errors
  // let the caller handle them and download the app again, etc.
  return extractCrx(getLatestInstalledCrx(id, purge));
}