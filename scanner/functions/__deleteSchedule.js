async function __deleteSchedule(context) {
    const job = context.job;
    const jobKeyActive = loader.app.meta.queue._getRepeatKey(job.data.jobName, job.data.jobOptions.repeat);
    const repeat = await job.queue.repeat;
    await repeat.removeRepeatableByKey(jobKeyActive);
  }