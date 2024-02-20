function exposeValue(sandbox, config, key, value) {
    if (!value) {
      return;
    }

    if (config.injectInto) {
      config.injectInto[key] = value;
    } else {
      push.call(sandbox.args, value);
    }
  }