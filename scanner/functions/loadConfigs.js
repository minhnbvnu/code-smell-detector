function loadConfigs() {
    Object.keys(modules).forEach(key => {
      const module = modules[key];
      const ebConfig = (loader.app.meta.configs[module.info.relativeName] = {});

      // module config
      if (module.main.config) {
        let config = module.main.config(loader.appInfo);
        // configNew is not used by now
        const configNew = loader.app.meta.util.monkeyModule(
          loader.app.meta.appMonkey,
          loader.app.meta.modulesMonkey,
          'configLoaded',
          {
            module,
            config,
          }
        );
        if (configNew) {
          config = configNew;
        }
        extend(true, ebConfig, config);
      }

      // application config
      if (loader.config.modules && loader.config.modules[module.info.relativeName]) {
        extend(true, ebConfig, loader.config.modules[module.info.relativeName]);
      }
    });
  }