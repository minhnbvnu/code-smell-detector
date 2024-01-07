function applyMethodDecorators(path, state) {
	        var hasMethodDecorators = path.node.body.body.some(function (node) {
	            return (node.decorators || []).length > 0;
	        });

	        if (!hasMethodDecorators) return;

	        return applyTargetDecorators(path, state, path.node.body.body);
	    }