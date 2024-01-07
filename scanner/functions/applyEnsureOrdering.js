function applyEnsureOrdering(path) {
	        // TODO: This should probably also hoist computed properties.
	        var decorators = (path.isClass() ? [path].concat(path.get('body.body')) : path.get('properties')).reduce(function (acc, prop) {
	            return acc.concat(prop.node.decorators || []);
	        }, []);

	        var identDecorators = decorators.filter(function (decorator) {
	            return !t.isIdentifier(decorator.expression);
	        });
	        if (identDecorators.length === 0) return;

	        return t.sequenceExpression(identDecorators.map(function (decorator) {
	            var expression = decorator.expression;
	            var id = decorator.expression = path.scope.generateDeclaredUidIdentifier('dec');
	            return t.assignmentExpression('=', id, expression);
	        }).concat([path.node]));
	    }