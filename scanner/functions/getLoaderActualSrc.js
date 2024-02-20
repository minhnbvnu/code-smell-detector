function getLoaderActualSrc(src) {
    if (src.indexOf('??') === -1) {
      return src
    }

    // Such as: http://cdn.com/??seajs/1.2.0/sea.js,jquery/1.7.2/jquery.js
    // Only support nginx combo style rule. If you use other combo rule, please
    // explicitly config the base path and the alias for plugins.
    var parts = src.split('??')
    var root = parts[0]
    var paths = util.filter(parts[1].split(','), function(str) {
      return str.indexOf('sea.js') !== -1
    })

    return root + paths[0]
  }