function reload (options) {
  if (_deferReload !== 0) {
    setTimeout(_reload, _deferReload)
    console.log(`%cHMR`, tagStyle, `Client reload defered, will reload in ${_deferReload} ms`)
  } else if (_suppressNextReload) {
    if (!_suppressTimer) {
      console.log(`%cHMR%c ⥁ Client version changed, reload suppressed because of a recent HMR update. You may need to reload the page.`, tagStyle, 'color: #F36E00;')
    }
    clearTimeout(_suppressTimer)
    // Debounce reload with 1 sec. timer
    _suppressTimer = setTimeout(() => {
      _suppressNextReload = false
      _suppressTimer = undefined
    }, 1000)
  } else {
    console.log(`%cHMR`, tagStyle, `Reloading app...`)
    _reload.call(Reload, options)
  }
  _deferReload = 0
}