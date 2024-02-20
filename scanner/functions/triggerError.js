function triggerError() {
        // When the redis service responds, the command is dequeued and then
        // the command callback is executed, if exists. Since we don't have a callback,
        // we wait for the command to be removed from the queue.
        if (client.commandQueueLength > 0) {
          t.comment('set command still in command queue. scheduling retry in 100ms')

          setTimeout(triggerError, 100)
          return
        }

        t.comment('executing hset which should error')
        // This will generate an error because `testKey` is not a hash.
        client.hset('testKey', 'hashKey', 'foobar')
      }