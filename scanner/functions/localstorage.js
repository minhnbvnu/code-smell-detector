function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}