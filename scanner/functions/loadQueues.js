function loadQueues() {
    for (const key in modules) {
      const module = modules[key];
      const config = loader.app.meta.configs[module.info.relativeName];
      if (!config.queues) continue;
      for (const queueName in config.queues) {
        const queueConfig = config.queues[queueName];
        const fullKey = `${module.info.relativeName}:${queueName}`;
        // bean
        const beanName = queueConfig.bean;
        if (!beanName) throw new Error(`bean not set for queue: ${fullKey}`);
        let bean;
        if (typeof beanName === 'string') {
          bean = {
            module: module.info.relativeName,
            name: beanName,
          };
        } else {
          bean = {
            module: beanName.module || module.info.relativeName,
            name: beanName.name,
          };
        }
        ebQueues[fullKey] = {
          module: module.info.relativeName,
          name: queueName,
          config: queueConfig,
          bean,
        };
      }
    }
  }