function executor(accept, reject) {
        segment = agent.tracer.getSegment()
        setTimeout(function resolve() {
          reject(10)
          accept(15)
        }, 0)
      }