function genHas(obj) {
    return function (key, fallback) {
      return obj.hasOwnProperty(key) && obj[key] !== undefined
        ? obj[key]
        : fallback
    }
  }