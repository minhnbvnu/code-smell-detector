function getAttrsProxy(instance) {
    return instance.attrsProxy || (instance.attrsProxy = new Proxy(
      instance.attrs,
      {
        get(target, key) {
          markAttrsAccessed();
          track(instance, "get", "$attrs");
          return target[key];
        },
        set() {
          warn(`setupContext.attrs is readonly.`);
          return false;
        },
        deleteProperty() {
          warn(`setupContext.attrs is readonly.`);
          return false;
        }
      } 
    ));
  }