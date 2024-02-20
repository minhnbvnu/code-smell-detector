async function localStorageAvailable() {
  if (typeof(Storage) !== "undefined") {
    return true;
  }
  return false;
}