function pushJob(job) {
    queue$1.push(job);
    if (!queued) {
      queued = true;
      nextTick(flush);
    }
  }