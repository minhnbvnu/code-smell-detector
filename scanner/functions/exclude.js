function exclude () {
    var excludes = [].slice.call(arguments);

    function excludeProps (res, obj) {
      Object.keys(obj).forEach(function (key) {
        if (!~excludes.indexOf(key)) res[key] = obj[key];
      });
    }

    return function extendExclude () {
      var args = [].slice.call(arguments)
        , i = 0
        , res = {};

      for (; i < args.length; i++) {
        excludeProps(res, args[i]);
      }

      return res;
    };
  }