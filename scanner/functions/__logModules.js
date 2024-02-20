function __logModules(context, log) {
  for (const module of context.modulesArray) {
    const relativeName = module.info.relativeName;
    if (module.info.monkey) {
      context.modulesMonkey[relativeName] = module;
    }
    if (module.info.public) {
      context.modulesGlobal[relativeName] = module;
    } else {
      context.modulesLocal[relativeName] = module;
    }
  }
  if (!log) return;
  // log
  console.log(chalk.yellow('\n=== Local Modules ==='));
  for (const key in context.modulesLocal) {
    console.log(chalk.cyan('> ' + key));
  }
  console.log(chalk.yellow('\n=== Global Modules ==='));
  for (const key in context.modulesGlobal) {
    console.log(chalk.cyan('> ' + key));
  }
  console.log(chalk.yellow('\n=== Monkey Modules ==='));
  for (const key in context.modulesMonkey) {
    console.log(chalk.cyan('> ' + key));
  }
  console.log(chalk.keyword('orange')(`\n=== Total Modules: ${context.modulesArray.length} ===`));
  // console.log('\n');
}