function _getBootstrapSettings(bootstrap, bootstrapConfig, defaultButton) {
    var config = {};
    if (bootstrap) {
      config.bootstrapClass = bootstrapConfig[0] + " ";
      config.bootstrapTheme = bootstrapConfig[1] + " ";
      config.bootstrapSpacing = bootstrapConfig[2] + " ";
    } else {
      config.bootstrapClass = defaultButton + " ";
      config.bootstrapTheme = "";
      config.bootstrapSpacing = "";
    }
    return config;
  }