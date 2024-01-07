function applyClassDecorators(classPath, state) {
	        var decorators = classPath.node.decorators || [];
	        classPath.node.decorators = null;

	        if (decorators.length === 0) return;

	        var name = classPath.scope.generateDeclaredUidIdentifier('class');

	        return decorators.map(function (dec) {
	            return dec.expression;
	        }).reverse().reduce(function (acc, decorator) {
	            return buildClassDecorator({
	                CLASS_REF: name,
	                DECORATOR: decorator,
	                INNER: acc
	            }).expression;
	        }, classPath.node);
	    }