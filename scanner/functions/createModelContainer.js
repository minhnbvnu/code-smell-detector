function createModelContainer(context, relativeName) {
    // base
    const modelContainer = new ModelClass({ table: null });
    // should set modelContainer.ctx;
    modelContainer.ctx = context;
    // remove app/config/service
    modelContainer.app = undefined;
    modelContainer.config = undefined;
    modelContainer.service = undefined;
    // module
    modelContainer.__ebCacheModule = new Map();
    modelContainer.module = function (moduleName) {
      let _modelContainer = modelContainer.__ebCacheModule.get(moduleName);
      if (!_modelContainer) {
        _modelContainer = createModelContainer(context, moduleName);
        modelContainer.__ebCacheModule.set(moduleName, _modelContainer);
      }
      return _modelContainer;
    };
    // proxy
    return new Proxy(modelContainer, {
      get(obj, prop) {
        // base
        if (obj[prop]) return obj[prop];
        const beanName = `model.${prop}`;
        // model
        return context.bean._getBean(relativeName, beanName);
      },
    });
  }