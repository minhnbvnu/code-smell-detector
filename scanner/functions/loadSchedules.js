function loadSchedules() {
    for (const module of loader.app.meta.modulesArray) {
      const config = loader.app.meta.configs[module.info.relativeName];
      if (!config.schedules) continue;
      for (const scheduleKey in config.schedules) {
        const fullKey = `${module.info.relativeName}.${scheduleKey}`;
        const scheduleConfig = config.schedules[scheduleKey];
        // bean
        const beanName = scheduleConfig.bean;
        if (!beanName) throw new Error(`bean not set for schedule: ${fullKey}`);
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
        ebSchedules[fullKey] = {
          module: module.info.relativeName,
          name: scheduleKey,
          config: scheduleConfig,
          bean,
        };
      }
    }
  }