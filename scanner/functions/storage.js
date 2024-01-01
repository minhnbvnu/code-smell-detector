function storage () {
  try {
    return window.localStorage;
  } catch (e) {
  }
}