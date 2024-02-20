function getDefaultValueConfig(config) {
      var keys = isObject(config) ? objectKeys(config) : [];
      var isShorthand = indexOf(keys, "value") === -1 && indexOf(keys, "type") === -1 &&
                        indexOf(keys, "squash") === -1 && indexOf(keys, "array") === -1;
      var configValue = isShorthand ? config : config.value;
      var result = {
        fn: isInjectable(configValue) ? configValue : function () { return result.value; },
        value: configValue
      };
      return result;
    }