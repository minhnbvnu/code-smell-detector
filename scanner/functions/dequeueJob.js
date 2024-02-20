function dequeueJob(job) {
  let index = queue.indexOf(job);
  if (index !== -1)
    queue.splice(index, 1);
}