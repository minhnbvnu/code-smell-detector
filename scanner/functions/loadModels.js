function loadModels() {
    for (const key in modules) {
      const module = modules[key];
      const models = module.main.models;
      if (!models) continue;
      for (const modelName in models) {
        const beanName = `model.${modelName}`;
        const bean = {
          mode: 'app',
          bean: models[modelName],
        };
        loader.app.bean._register(module.info.relativeName, beanName, bean);
      }
    }
  }