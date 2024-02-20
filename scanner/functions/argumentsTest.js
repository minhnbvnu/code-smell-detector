function argumentsTest() {
        const argsToArray = shim.toArray(arguments)
        t.same(argsToArray, res)
        t.ok(argsToArray instanceof Array)
      }