function applyTargetDecorators(path, state, decoratedProps) {
	        var descName = path.scope.generateDeclaredUidIdentifier('desc');
	        var valueTemp = path.scope.generateDeclaredUidIdentifier('value');

	        var name = path.scope.generateDeclaredUidIdentifier(path.isClass() ? 'class' : 'obj');

	        var exprs = decoratedProps.reduce(function (acc, node) {
	            var decorators = node.decorators || [];
	            node.decorators = null;

	            if (decorators.length === 0) return acc;

	            if (node.computed) {
	                throw path.buildCodeFrameError('Computed method/property decorators are not yet supported.');
	            }

	            var property = t.isLiteral(node.key) ? node.key : t.stringLiteral(node.key.name);

	            var target = path.isClass() && !node.static ? buildClassPrototype({
	                CLASS_REF: name
	            }).expression : name;

	            if (t.isClassProperty(node, { static: false })) {
	                var descriptor = path.scope.generateDeclaredUidIdentifier('descriptor');

	                var initializer = node.value ? t.functionExpression(null, [], t.blockStatement([t.returnStatement(node.value)])) : t.nullLiteral();
	                node.value = t.callExpression(ensureInitializerWarning(path, state), [descriptor, t.thisExpression()]);

	                acc = acc.concat([t.assignmentExpression('=', descriptor, t.callExpression(ensureApplyDecoratedDescriptorHelper(path, state), [target, property, t.arrayExpression(decorators.map(function (dec) {
	                    return dec.expression;
	                })), t.objectExpression([t.objectProperty(t.identifier('enumerable'), t.booleanLiteral(true)), t.objectProperty(t.identifier('initializer'), initializer)])]))]);
	            } else {
	                acc = acc.concat(t.callExpression(ensureApplyDecoratedDescriptorHelper(path, state), [target, property, t.arrayExpression(decorators.map(function (dec) {
	                    return dec.expression;
	                })), t.isObjectProperty(node) || t.isClassProperty(node, { static: true }) ? buildGetObjectInitializer({
	                    TEMP: path.scope.generateDeclaredUidIdentifier('init'),
	                    TARGET: target,
	                    PROPERTY: property
	                }).expression : buildGetDescriptor({
	                    TARGET: target,
	                    PROPERTY: property
	                }).expression, target]));
	            }

	            return acc;
	        }, []);

	        return t.sequenceExpression([t.assignmentExpression('=', name, path.node), t.sequenceExpression(exprs), name]);
	    }