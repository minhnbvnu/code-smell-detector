function excludeProps (res, obj) {
      Object.keys(obj).forEach(function (key) {
        if (!~excludes.indexOf(key)) res[key] = obj[key];
      });
    }