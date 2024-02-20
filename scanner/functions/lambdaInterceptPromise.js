function lambdaInterceptPromise(prom, resultProcessor, cb) {
      prom.then(
        function onThen(arg) {
          if (resultProcessor) {
            resultProcessor(arg)
          }
          cb()
        },
        function onCatch(err) {
          uncaughtException = err
          cb()
        }
      )
      return prom
    }