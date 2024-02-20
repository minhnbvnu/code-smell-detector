function parallelLimit(tasks, callback) {
  _parallel(eachOf, tasks, callback);
}