function executingFunction() {
        contextManager.runInContext(
          newContext,
          function functionRunInContext(arg1, arg2) {
            t.equal(arg1, expectedArg1)
            t.equal(arg2, expectedArg2)
            t.end()
          },
          null,
          arguments
        )
      }