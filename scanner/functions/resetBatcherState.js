function resetBatcherState() {
    queue.length = 0;
    userQueue.length = 0;
    has = {};
    circular = {};
    waiting = false;
  }