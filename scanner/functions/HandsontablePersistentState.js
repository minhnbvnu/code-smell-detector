function HandsontablePersistentState() {
    var plugin = this;


    this.init = function () {
      var instance = this,
        pluginSettings = instance.getSettings()['persistentState'];

      plugin.enabled = !!(pluginSettings);

      if (!plugin.enabled) {
        removeHooks.call(instance);
        return;
      }

      if (!instance.storage) {
        instance.storage = new StorageClass(instance.rootElement[0].id);
      }

      instance.resetState = plugin.resetValue;

      addHooks.call(instance);

    };

    this.saveValue = function (key, value) {
      var instance = this;

      instance.storage.saveValue(key, value);
    };

    this.loadValue = function (key, saveTo) {
      var instance = this;

      saveTo.value = instance.storage.loadValue(key);
    };

    this.resetValue = function (key) {
      var instance = this;

      if (typeof  key != 'undefined') {
        instance.storage.reset(key);
      } else {
        instance.storage.resetAll();
      }

    };

    var hooks = {
      'persistentStateSave': plugin.saveValue,
      'persistentStateLoad': plugin.loadValue,
      'persistentStateReset': plugin.resetValue
    };

    function addHooks() {
      var instance = this;

      for (var hookName in hooks) {
        if (hooks.hasOwnProperty(hookName) && !hookExists.call(instance, hookName)) {
          instance.PluginHooks.add(hookName, hooks[hookName]);
        }
      }
    }

    function removeHooks() {
      var instance = this;

      for (var hookName in hooks) {
        if (hooks.hasOwnProperty(hookName) && hookExists.call(instance, hookName)) {
          instance.PluginHooks.remove(hookName, hooks[hookName]);
        }
      }
    }

    function hookExists(hookName) {
      var instance = this;
      return instance.PluginHooks.hooks['persistent'].hasOwnProperty(hookName);
    }
  }