function scriptLocation() {
  var scriptLocation = window.location.href.substring(0,window.location.href.length
    - window.location.search.length - window.location.hash.length);
  var hashIndex = scriptLocation.indexOf("#");
  if (hashIndex !== -1) {
    scriptLocation = scriptLocation.substring(0, hashIndex)
  }
  return scriptLocation
}