function handleJob(err, job)
{
  if (isUndefined(err)) {
    console.log('received job: ' + JSON.stringify(job.document));
    job.inProgress(function(err) {
      if (isUndefined(err)) {
        var jobFunction = job.succeeded;
        if (job.document.jobNum & 1) {
          jobFunction = job.failed;
        }

        jobFunction(function(err) {
          if (!isUndefined(err)) {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
  } else {
    console.log(err);
  }
}