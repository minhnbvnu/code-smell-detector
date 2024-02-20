function getCachedPredictionContext(context, contextCache, visited) {
	if (context.isEmpty()) {
		return context;
	}
	var existing = visited[context] || null;
	if (existing !== null) {
		return existing;
	}
	existing = contextCache.get(context);
	if (existing !== null) {
		visited[context] = existing;
		return existing;
	}
	var changed = false;
	var parents = [];
	for (var i = 0; i < parents.length; i++) {
		var parent = getCachedPredictionContext(context.getParent(i), contextCache, visited);
		if (changed || parent !== context.getParent(i)) {
			if (!changed) {
				parents = [];
				for (var j = 0; j < context.length; j++) {
					parents[j] = context.getParent(j);
				}
				changed = true;
			}
			parents[i] = parent;
		}
	}
	if (!changed) {
		contextCache.add(context);
		visited[context] = context;
		return context;
	}
	var updated = null;
	if (parents.length === 0) {
		updated = PredictionContext.EMPTY;
	} else if (parents.length === 1) {
		updated = SingletonPredictionContext.create(parents[0], context
				.getReturnState(0));
	} else {
		updated = new ArrayPredictionContext(parents, context.returnStates);
	}
	contextCache.add(updated);
	visited[updated] = updated;
	visited[context] = updated;

	return updated;
}