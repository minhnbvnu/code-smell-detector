function __checkJobValid(context) {
    const job = context.job;
    const { subdomain, module, name } = context.data;
    // schedule
    const fullKey = `${module}.${name}`;
    const schedule = ebSchedules[fullKey];
    if (!schedule) return false;
    // check disable
    if (schedule.config.disable) return false;
    // check if changed
    const jobKeyActive = loader.app.meta.queue._getRepeatKey(job.data.jobName, job.data.jobOptions.repeat);
    const jobNameConfig = __getJobName(subdomain, module, name);
    const jobKeyConfig = loader.app.meta.queue._getRepeatKey(jobNameConfig, schedule.config.repeat);
    if (jobKeyActive !== jobKeyConfig) return false;
    // ok
    return true;
  }