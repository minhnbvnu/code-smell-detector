function buildFn(fn){
		return cache[fn] = new Function("item", "index", "array", fn); // Function
	}