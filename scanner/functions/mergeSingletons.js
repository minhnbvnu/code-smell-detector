function mergeSingletons(a, b, rootIsWildcard, mergeCache) {
	if (mergeCache !== null) {
		var previous = mergeCache.get(a, b);
		if (previous !== null) {
			return previous;
		}
		previous = mergeCache.get(b, a);
		if (previous !== null) {
			return previous;
		}
	}

	var rootMerge = mergeRoot(a, b, rootIsWildcard);
	if (rootMerge !== null) {
		if (mergeCache !== null) {
			mergeCache.set(a, b, rootMerge);
		}
		return rootMerge;
	}
	if (a.returnState === b.returnState) {
		var parent = merge(a.parentCtx, b.parentCtx, rootIsWildcard, mergeCache);
		// if parent is same as existing a or b parent or reduced to a parent,
		// return it
		if (parent === a.parentCtx) {
			return a; // ax + bx = ax, if a=b
		}
		if (parent === b.parentCtx) {
			return b; // ax + bx = bx, if a=b
		}
		// else: ax + ay = a'[x,y]
		// merge parents x and y, giving array node with x,y then remainders
		// of those graphs. dup a, a' points at merged array
		// new joined parent so create new singleton pointing to it, a'
		var spc = SingletonPredictionContext.create(parent, a.returnState);
		if (mergeCache !== null) {
			mergeCache.set(a, b, spc);
		}
		return spc;
	} else { // a != b payloads differ
		// see if we can collapse parents due to $+x parents if local ctx
		var singleParent = null;
		if (a === b || (a.parentCtx !== null && a.parentCtx === b.parentCtx)) { // ax +
																				// bx =
																				// [a,b]x
			singleParent = a.parentCtx;
		}
		if (singleParent !== null) { // parents are same
			// sort payloads and use same parent
			var payloads = [ a.returnState, b.returnState ];
			if (a.returnState > b.returnState) {
				payloads[0] = b.returnState;
				payloads[1] = a.returnState;
			}
			var parents = [ singleParent, singleParent ];
			var apc = new ArrayPredictionContext(parents, payloads);
			if (mergeCache !== null) {
				mergeCache.set(a, b, apc);
			}
			return apc;
		}
		// parents differ and can't merge them. Just pack together
		// into array; can't merge.
		// ax + by = [ax,by]
		var payloads = [ a.returnState, b.returnState ];
		var parents = [ a.parentCtx, b.parentCtx ];
		if (a.returnState > b.returnState) { // sort by payload
			payloads[0] = b.returnState;
			payloads[1] = a.returnState;
			parents = [ b.parentCtx, a.parentCtx ];
		}
		var a_ = new ArrayPredictionContext(parents, payloads);
		if (mergeCache !== null) {
			mergeCache.set(a, b, a_);
		}
		return a_;
	}
}