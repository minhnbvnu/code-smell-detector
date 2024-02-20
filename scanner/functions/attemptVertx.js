function attemptVertx () {
    try {
      var r = require
      var vertx = r('vertx')
      vertxNext = vertx.runOnLoop || vertx.runOnContext
      return useVertxTimer()
    } catch (e) {
      return useSetTimeout()
    }
  }