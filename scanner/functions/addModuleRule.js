function addModuleRule(webpackConfig, ruleOrRules) {
  const isManyRules = _.isArray(ruleOrRules);
  const rules = isManyRules ? ruleOrRules : [ruleOrRules];

  if (!_.has(webpackConfig, 'module.rules')) {
    return {
      ...webpackConfig,
      module: {
        rules,
      },
    };
  }

  const newWebpackConfig = _.cloneDeep(webpackConfig);
  newWebpackConfig.module.rules = _.union(newWebpackConfig.module.rules, rules);
  return newWebpackConfig;
}