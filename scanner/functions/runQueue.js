function runQueue(queue) {
    for (let i=0, l=queue.length; i < l; i++) {
      callMethod(queue.shift());
    }
  }