function __installSchedules({ subdomain }) {
    for (const fullKey in ebSchedules) {
      const schedule = ebSchedules[fullKey];
      if (!schedule.config.disable && schedule.config.repeat) {
        // push
        const jobName = __getJobName(subdomain, schedule.module, schedule.name); // not use :
        loader.app.meta.queue.push({
          subdomain,
          module: 'a-base',
          queueName: 'schedule',
          queueNameSub: fullKey,
          jobName,
          jobOptions: {
            // jobId,
            repeat: schedule.config.repeat,
          },
          data: {
            subdomain,
            module: schedule.module,
            name: schedule.name,
          },
        });
      }
    }
  }