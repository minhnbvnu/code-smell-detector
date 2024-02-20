function parallelLimit$1(tasks, limit, callback) {
  _parallel(_eachOfLimit(limit), tasks, callback);
}