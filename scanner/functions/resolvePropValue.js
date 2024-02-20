function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(
              null,
              props
            );
            unsetCurrentInstance();
          }
        } else {
          value = defaultValue;
        }
      }
      if (opt[0 /* shouldCast */]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[1 /* shouldCastTrue */] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }