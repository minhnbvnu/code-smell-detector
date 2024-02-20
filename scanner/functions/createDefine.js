function createDefine(name, module) {
		define(name, function () {
			return module;
		});
	}