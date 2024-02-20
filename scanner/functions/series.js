function series(tasks, callback) {
  _parallel(eachOfSeries, tasks, callback);
}