function notifyTestsRan(module) {
  	module.testsRun++;
  	while (module = module.parentModule) {
  		module.testsRun++;
  	}
  }