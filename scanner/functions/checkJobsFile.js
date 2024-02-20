function checkJobsFile(id, cb) {

    fs.readFile(jobsFile, "utf8", function(err, raw){
      var jobs = JSON.parse(raw);
      test.equal(jobs.jobs.pop().id, id);
      fs.writeFile(jobsFile, JSON.stringify(jobs), cb);
    });

  }