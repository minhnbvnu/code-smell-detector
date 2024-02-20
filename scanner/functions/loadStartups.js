function loadStartups() {
    for (const module of ebModulesArray) {
      const config = loader.app.meta.configs[module.info.relativeName];
      if (!config.startups) continue;
      for (const startupKey in config.startups) {
        const startupConfig = config.startups[startupKey];
        const fullKey = `${module.info.relativeName}:${startupKey}`;
        // bean
        const beanName = startupConfig.bean;
        if (!beanName) throw new Error(`bean not set for startup: ${fullKey}`);
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
        ebStartups[fullKey] = {
          key: fullKey,
          module: module.info.relativeName,
          name: startupKey,
          config: startupConfig,
          bean,
        };
        ebStartupsArray.push(ebStartups[fullKey]);
      }
    }
  }