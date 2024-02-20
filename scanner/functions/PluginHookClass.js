function PluginHookClass() {

    this.hooks = {
      once: Hooks(),
      persistent: Hooks()
    };

    this.legacy = legacy;

  }