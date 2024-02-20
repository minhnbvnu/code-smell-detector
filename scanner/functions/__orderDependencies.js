function __orderDependencies(context, modules, module, moduleRelativeName) {
  if (context.options.disableCheckDependencies) return true;
  if (!module.package.eggBornModule || !module.package.eggBornModule.dependencies) return true;

  let enabled = true;

  const dependencies = module.package.eggBornModule.dependencies;
  for (const key in dependencies) {
    const subModule = modules[key];
    if (!subModule) {
      const message =
        chalk.keyword('orange')(`module ${moduleRelativeName} disabled`) +
        ', because ' +
        chalk.keyword('cyan')(`module ${key} not exists`);
      console.log('\n' + boxen(message, boxenOptions) + '\n');
      enabled = false; // process.exit(0);
      continue;
    }

    const subModuleVersion = dependencies[key];
    if (semver.lt(subModule.package.version, subModuleVersion)) {
      console.warn(chalk.cyan(`module ${key} is old`));
      process.exit(0);
    }

    if (!__pushModule(context, modules, key)) {
      enabled = false;
    }
  }

  return enabled;
}