function reload() {
  for (let id in require.cache) {
    if (/eslint-plugin-react-hooks/.test(id)) {
      delete require.cache[id];
    }
  }
  // Point to the built version.
  build = require('../../../build/oss-experimental/eslint-plugin-react-hooks');
}