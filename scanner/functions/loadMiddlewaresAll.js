function loadMiddlewaresAll(ebMiddlewaresAll, ebModulesArray, loader) {
  for (const module of ebModulesArray) {
    const config = loader.app.meta.configs[module.info.relativeName];
    if (!config.middlewares) continue;
    for (const middlewareKey in config.middlewares) {
      const middlewareConfig = config.middlewares[middlewareKey];
      // bean
      const beanName = middlewareConfig.bean;
      if (!beanName) throw new Error(`bean not set for middleware: ${module.info.relativeName}.${middlewareKey}`);
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
      // push
      ebMiddlewaresAll.push({
        module: module.info.relativeName,
        name: middlewareKey,
        options: middlewareConfig,
        bean,
      });
    }
  }
}