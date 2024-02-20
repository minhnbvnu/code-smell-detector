function _browser() {
  try {
    return require("webextension-polyfill");
  } catch (err) {
    // console.log("[browser]", err.message);
  }
}