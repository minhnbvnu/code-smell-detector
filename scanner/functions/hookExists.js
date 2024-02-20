function hookExists(hookName) {
      var instance = this;
      return instance.PluginHooks.hooks['persistent'].hasOwnProperty(hookName);
    }