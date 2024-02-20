function getSet(module){
		return function(node, name, value){
			if(arguments.length == 2){
				return module[typeof name == "string" ? "get" : "set"](node, name);
			}
			// setter
			return module.set(node, name, value);
		};
	}