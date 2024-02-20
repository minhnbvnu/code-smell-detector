function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      {
        instance.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      if (isVNode(setupResult)) {
        warn(
          `setup() should not return VNodes directly - return a render function instead.`
        );
      }
      {
        instance.devtoolsRawSetupState = setupResult;
      }
      instance.setupState = proxyRefs(setupResult);
      {
        exposeSetupStateOnRenderContext(instance);
      }
    } else if (setupResult !== void 0) {
      warn(
        `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
      );
    }
    finishComponentSetup(instance, isSSR);
  }