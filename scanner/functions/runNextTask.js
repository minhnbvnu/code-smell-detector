function runNextTask(tasks) {
    var nextTask = tasks.shift();
    nextTask();
  }