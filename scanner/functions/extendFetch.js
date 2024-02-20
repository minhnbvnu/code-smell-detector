function extendFetch() {
    var _fetch = Module._fetch

    Module._fetch = function(url, callback, charset) {
      var pluginName = uriCache[util.unParseMap(url)]

      if (pluginName) {
        pluginsInfo[pluginName].fetch(url, callback, charset)
        return
      }

      _fetch(url, callback, charset)
    }
  }