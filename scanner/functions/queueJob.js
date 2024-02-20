function queueJob(job) {
  if (!queue.includes(job))
    queue.push(job);
  queueFlush();
}