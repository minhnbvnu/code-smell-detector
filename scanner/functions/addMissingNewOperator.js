function addMissingNewOperator(changes, sourceFile, span) {
            const call = cast(findAncestorMatchingSpan2(sourceFile, span), isCallExpression);
            const newExpression = factory.createNewExpression(call.expression, call.typeArguments, call.arguments);
            changes.replaceNode(sourceFile, call, newExpression);
        }