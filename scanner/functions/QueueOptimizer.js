function QueueOptimizer(queue) {
    this.queue = queue;
    this.state = null;
    this.context = {
      iCurr: 0,
      fnArray: queue.fnArray,
      argsArray: queue.argsArray
    };
    this.match = null;
    this.lastProcessed = 0;
  }