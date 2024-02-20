function extendResolve() {
    var _resolve = Module._resolve

    Module._resolve = function(id, refUri) {
      var pluginName

      if (/\.\w|^\w+!/.test(id)) {
        var m

        // id = text!path/to/some
        if (m = id.match(/^(\w+)!(.*)$/)) {
          pluginName = m[1]
          id = m[2]
        }
        // id = abc.xyz?t=123
        else if ((m = id.match(/[^?]*(\.\w+)/))) {
          var ext = m[1]
          for (var k in pluginsInfo) {

            if (pluginsInfo.hasOwnProperty(k) &&
                util.indexOf(pluginsInfo[k].ext, ext) > -1) {
              pluginName = k
              break
            }
          }
        }

        // Prevents adding the default `.js` extension
        if (pluginName && !/\?|#$/.test(id)) {
          id += '#'
        }
      }

      var uri = _resolve(id, refUri)

      if (pluginName && pluginsInfo[pluginName] && !uriCache[uri]) {
        uriCache[uri] = pluginName
      }

      return uri
    }
  }