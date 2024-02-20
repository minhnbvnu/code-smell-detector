function getJob(cb) {
    client.blpop(prefix + "jobs", 5, function(err, job) {
      cb(err, job ? JSON.parse(job[1]) : null);
    });
  }