function testType(type, expectedName) {
        const wrapped = shim.recordParamware(wrappable.getActiveSegment, {
          type: type,
          name: 'foo'
        })
        helper.runInTransaction(agent, function (tx) {
          txInfo.transaction = tx
          const segment = wrapped(req)

          t.equal(segment.name, expectedName)
        })
      }