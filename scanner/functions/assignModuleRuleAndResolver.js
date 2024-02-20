function assignModuleRuleAndResolver(
  webpackConfig,
  rules,
  resolverExts,
  aliases
) {
  const newWebpackConfig = addModuleRule(webpackConfig, rules);
  return resolverExts
    ? addResolverExtensions(newWebpackConfig, resolverExts, aliases)
    : newWebpackConfig;
}