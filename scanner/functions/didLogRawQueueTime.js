function didLogRawQueueTime(args) {
        let didLog = false

        args.forEach((argument) => {
          const foundQueueTime = argument.indexOf(invalidRawQueueTime) >= 0
          if (foundQueueTime) {
            didLog = true
          }
        })

        return didLog
      }