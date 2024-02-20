function doSomeWork(segmentName, shouldReject) {
    const tracer = agent.tracer
    const segment = tracer.createSegment(segmentName)
    return tracer.bindFunction(actualWork, segment)()
    function actualWork() {
      segment.touch()
      return new Promise(function startSomeWork(resolve, reject) {
        if (shouldReject) {
          process.nextTick(function () {
            reject('some reason')
          })
        } else {
          process.nextTick(function () {
            resolve(123)
          })
        }
      })
    }
  }