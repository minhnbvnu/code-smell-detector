function useModel(props, name, options) {
    const i = getCurrentInstance();
    if (!i) {
      warn(`useModel() called without active instance.`);
      return ref();
    }
    if (!i.propsOptions[0][name]) {
      warn(`useModel() called with prop "${name}" which is not declared.`);
      return ref();
    }
    if (options && options.local) {
      const proxy = ref(props[name]);
      watch(
        () => props[name],
        (v) => proxy.value = v
      );
      watch(proxy, (value) => {
        if (value !== props[name]) {
          i.emit(`update:${name}`, value);
        }
      });
      return proxy;
    } else {
      return {
        __v_isRef: true,
        get value() {
          return props[name];
        },
        set value(value) {
          i.emit(`update:${name}`, value);
        }
      };
    }
  }