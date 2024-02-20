function __logSuites(context, log) {
  for (const suiteName in context.suites) {
    const suite = context.suites[suiteName];
    if (suite.info.vendor) {
      context.suitesVendor[suiteName] = suite;
    } else {
      context.suitesLocal[suiteName] = suite;
    }
  }
  if (!log) return;
  // log
  console.log(chalk.yellow('\n=== Local Suites ==='));
  for (const key in context.suitesLocal) {
    console.log(chalk.cyan('> ' + key));
  }
  console.log(chalk.yellow('\n=== Vendor Suites ==='));
  for (const key in context.suitesVendor) {
    console.log(chalk.cyan('> ' + key));
  }
  console.log(chalk.keyword('orange')(`\n=== Total Suites: ${Object.keys(context.suites).length} ===`));
  console.log('\n');
}