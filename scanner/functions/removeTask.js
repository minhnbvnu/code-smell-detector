function removeTask(promise) {
    tasks = _(tasks).reject(function(task) {
      return task === promise;
    });
  }