function handleDependents(ebMiddlewaresAll) {
  for (const middleware of ebMiddlewaresAll) {
    let dependents = middleware.options.dependents;
    if (!dependents) continue;
    if (!Array.isArray(dependents)) {
      dependents = dependents.split(',');
    }
    for (const dep of dependents) {
      const middleware2 = ebMiddlewaresAll.find(item => item.name === dep);
      if (!middleware2) {
        throw new Error(`middleware ${dep} not found for dependents of ${middleware.name}`);
      }
      const options = middleware2.options;
      if (!options.dependencies) options.dependencies = [];
      if (!Array.isArray(options.dependencies)) {
        options.dependencies = options.dependencies.split(',');
      }
      if (options.dependencies.findIndex(item => item === middleware.name) === -1) {
        options.dependencies.push(middleware.name);
      }
    }
  }
}