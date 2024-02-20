function wrapMe() {
          const err = new Error(expectErrMsg)
          Object.freeze(err)
          throw err
        }