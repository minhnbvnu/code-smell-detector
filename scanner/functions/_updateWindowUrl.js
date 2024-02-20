function _updateWindowUrl (newDarPath) {
  // Update the browser url, so on reload, we get the contents from the
  // new location
  let newUrl = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    query: {
      darPath: newDarPath
    },
    slashes: true
  })
  window.history.replaceState({}, 'After Save As', newUrl)
}