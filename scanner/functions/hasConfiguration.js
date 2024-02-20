function hasConfiguration(tpl, configKey) {
  return _.findKey(tpl, item => {
    if (!_.isObject(item)) {
      return false;
    }
    if (Object.keys(item).includes(configKey)) {
      return true;
    }
    return hasConfiguration(item, configKey);
  });
}