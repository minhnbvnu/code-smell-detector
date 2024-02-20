function getConfigDescription(configKey) {
    var configDescription = "";
    angular.forEach(KAFKA_DEFAULTS, function (kafkaDefault) {
      if (kafkaDefault.property == configKey) {
        configDescription = kafkaDefault.description;
      }
    });
    return configDescription;
  }