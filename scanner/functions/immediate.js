function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}