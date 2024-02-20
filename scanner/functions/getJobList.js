function getJobList(cb) {
    client.lrange(prefix + "jobs", 0, -1, function(err, jobs) {
      if (!err && jobs) {
        jobs = jobs.map(function(job){
          return JSON.parse(job);
        });
      }
      cb(err,jobs);
    });
  }