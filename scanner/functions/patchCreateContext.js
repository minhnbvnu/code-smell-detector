function patchCreateContext() {
    const createContext = loader.app.createContext;
    loader.app.createContext = (...args) => {
      const context = createContext.call(loader.app, ...args);

      // maybe /favicon.ico
      if (context.module) {
        Object.defineProperty(context, 'service', {
          get() {
            let service = context[SERVICEPROXY];
            if (!service) {
              service = context[SERVICEPROXY] = new Proxy(
                {},
                {
                  get(obj, prop) {
                    const beanName = `service.${prop}`;
                    return context.bean._getBean(context.module.info.relativeName, beanName);
                  },
                }
              );
            }
            return service;
          },
        });
      }

      return context;
    };
  }