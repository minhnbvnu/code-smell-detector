function loadBeans() {
    for (const key in ebModulesArray) {
      const module = ebModulesArray[key];
      const beans = module.main.beans;
      if (!beans) continue;
      for (const beanName in beans) {
        const moduleName = module.info.relativeName;
        const beanClass = beans[beanName];
        if (['app', 'ctx'].includes(beanClass.mode)) {
          throw new Error(`bean: ${moduleName}:${beanName}, mode: ${beanClass.mode} is deprecated, use Class instead.`);
        }
        loader.app.bean._register(moduleName, beanName, beanClass);
      }
    }
  }