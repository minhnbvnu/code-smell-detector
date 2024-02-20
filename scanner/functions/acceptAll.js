function acceptAll(modules, inverseDependencies) {
    if (!modules || modules.length === 0) {
      return true;
    }

    var notAccepted = modules.filter(function(module) {
      return !accept(module, /*factory*/ undefined, inverseDependencies);
    });

    var parents = [];
    for (var i = 0; i < notAccepted.length; i++) {
      // if this the module has no parents then the change cannot be hot loaded
      if (inverseDependencies[notAccepted[i]].length === 0) {
        return false;
      }

      parents.pushAll(inverseDependencies[notAccepted[i]]);
    }

    return acceptAll(parents, inverseDependencies);
  }