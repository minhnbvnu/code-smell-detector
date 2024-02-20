function replaceHash(path) {
  const i = location.href.indexOf('#')
  location.replace(location.href.slice(0, i >= 0 ? i : 0) + '#' + path)
}