function indexOfPriorQueueWithActions(daq, currentQueueIndex) {
      var queueName, queue;

      for (var i = 0, l = currentQueueIndex; i <= l; i++) {
        queueName = daq.queueNames[i];
        queue = daq.queues[queueName];
        if (queue._queue.length) { return i; }
      }

      return -1;
    }