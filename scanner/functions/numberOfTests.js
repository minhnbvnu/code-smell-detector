function numberOfTests(module) {
  	var count = module.tests.length,
  	    modules = [].concat(toConsumableArray(module.childModules));

  	// Do a breadth-first traversal of the child modules
  	while (modules.length) {
  		var nextModule = modules.shift();
  		count += nextModule.tests.length;
  		modules.push.apply(modules, toConsumableArray(nextModule.childModules));
  	}

  	return count;
  }