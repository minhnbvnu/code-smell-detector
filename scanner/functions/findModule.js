function findModule(id) {
    return modules[id] || lcModules[id.toLowerCase()];
  }