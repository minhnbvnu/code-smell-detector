function createSetupContext(instance) {
    const expose = (exposed) => {
      {
        if (instance.exposed) {
          warn(`expose() should be called only once per setup().`);
        }
        if (exposed != null) {
          let exposedType = typeof exposed;
          if (exposedType === "object") {
            if (isArray(exposed)) {
              exposedType = "array";
            } else if (isRef(exposed)) {
              exposedType = "ref";
            }
          }
          if (exposedType !== "object") {
            warn(
              `expose() should be passed a plain object, received ${exposedType}.`
            );
          }
        }
      }
      instance.exposed = exposed || {};
    };
    {
      return Object.freeze({
        get attrs() {
          return getAttrsProxy(instance);
        },
        get slots() {
          return getSlotsProxy(instance);
        },
        get emit() {
          return (event, ...args) => instance.emit(event, ...args);
        },
        expose
      });
    }
  }