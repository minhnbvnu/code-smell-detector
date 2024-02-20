function createDrawingPreFunction(name) {
      return function() {
        wireDimensionalFunctions("2D");
        return drawing[name].apply(this, arguments)
      }
    }