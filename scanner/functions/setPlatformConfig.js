function setPlatformConfig(platformName, platformConfigs) {
    configProperties.platform[platformName] = platformConfigs;
    provider.platform[platformName] = {};

    addConfig(configProperties, configProperties.platform[platformName]);

    createConfig(configProperties.platform[platformName], provider.platform[platformName], '');
  }