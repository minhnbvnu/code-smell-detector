function secondFunction() {
        return new Promise((resolve) => {
          setImmediate(resolve)
        })
      }