function applyObjectDecorators(path, state) {
	        var hasMethodDecorators = path.node.properties.some(function (node) {
	            return (node.decorators || []).length > 0;
	        });

	        if (!hasMethodDecorators) return;

	        return applyTargetDecorators(path, state, path.node.properties);
	    }