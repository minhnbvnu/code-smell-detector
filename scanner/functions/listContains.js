function listContains(type, data) {
    return function(node) {
      var val = options[type](node)
      val =
        Array.isArray(val) ? val :
        val ? val.toString().split(/\s+/) :
        []
      return val.indexOf(data) >= 0
    }
  }