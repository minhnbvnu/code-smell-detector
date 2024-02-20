function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      if (!isSSR && compile$1 && !Component.render) {
        const template = Component.template || resolveMergedOptions(instance).template;
        if (template) {
          {
            startMeasure(instance, `compile`);
          }
          const { isCustomElement, compilerOptions } = instance.appContext.config;
          const { delimiters, compilerOptions: componentCompilerOptions } = Component;
          const finalCompilerOptions = extend(
            extend(
              {
                isCustomElement,
                delimiters
              },
              compilerOptions
            ),
            componentCompilerOptions
          );
          Component.render = compile$1(template, finalCompilerOptions);
          {
            endMeasure(instance, `compile`);
          }
        }
      }
      instance.render = Component.render || NOOP;
      if (installWithProxy) {
        installWithProxy(instance);
      }
    }
    {
      setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking();
        unsetCurrentInstance();
      }
    }
    if (!Component.render && instance.render === NOOP && !isSSR) {
      if (!compile$1 && Component.template) {
        warn(
          `Component provided template option but runtime compilation is not supported in this build of Vue.` + (` Use "vue.global.js" instead.` )
          /* should not happen */
        );
      } else {
        warn(`Component is missing template or render function.`);
      }
    }
  }