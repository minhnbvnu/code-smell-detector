function clearTaskQueue(taskQueue) {
  do {
    jest.runAllTimers();
    taskQueue.processNext();
    jest.runAllTimers();
  } while (taskQueue.hasTasksToProcess())
}