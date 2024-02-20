function memoize_synchronous_function(func, max_entries=50000) {
	const cache = {};
	const keys = [];
	const memoized_func = (...args)=> {
		if (args.some((arg)=> arg instanceof CanvasPattern)) {
			return func.apply(null, args);
		}
		const key = JSON.stringify(args);
		if (cache[key]){
			return cache[key];
		} else{
			const val = func.apply(null, args);
			cache[key] = val;
			keys.push(key);
			if (keys.length > max_entries) {
				const oldest_key = keys.shift();
				delete cache[oldest_key];
			}
			return val; 
		}
	}
	memoized_func.clear_memo_cache = ()=> {
		for (const key of keys) {
			delete cache[key];
		}
		keys.length = 0;
	};
	return memoized_func;
}