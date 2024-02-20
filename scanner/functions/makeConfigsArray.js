function makeConfigsArray(configs) {
//    configs = {"segment.bytes":"104857600","cleanup.policy":"compact","compression.type":"producer"};
    var configArray = [];

    angular.forEach(configs, function(value, key) {
          var object = {
            configuration : key,
            value : value,
            defaultValue : getDefaultConfigValue(key),
            documentation : getConfigDescription(key)
          };
          this.push(object);
    }, configArray);
    return configArray;
  }