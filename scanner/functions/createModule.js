function createModule(id, dependencies) {
    var module = new Module({});
    module.path = id;
    module.getName.mockImpl(() => Promise.resolve(id));
    module.getDependencies.mockImpl(() => Promise.resolve(dependencies));
    return module;
  }