function runLifecycle(lifecycle) {
      if (scripts[lifecycle]) {
        return (0, (_executeLifecycleScript || _load_executeLifecycleScript()).execCommand)({ stage: lifecycle, config, cmd: scripts[lifecycle], cwd: config.cwd, isInteractive: true });
      }

      return Promise.resolve();
    }