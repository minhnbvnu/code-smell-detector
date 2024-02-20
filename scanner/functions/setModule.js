function setModule(id, module) {
    // store id separate from lowercased id so that
    // in all cases mixedCase id will stored distinctly
    // and lowercase version is a fallback
    modules[id] = lcModules[id.toLowerCase()] = module;
  }