function oneset(callback) {
    async.eachSeries(list, bench, callback);
  }