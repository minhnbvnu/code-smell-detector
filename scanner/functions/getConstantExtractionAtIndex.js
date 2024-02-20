function getConstantExtractionAtIndex(targetRange, context, requestedChangesIndex) {
            const { scopes, readsAndWrites: { target, usagesPerScope, constantErrorsPerScope, exposedVariableDeclarations } } = getPossibleExtractionsWorker(targetRange, context);
            Debug.assert(!constantErrorsPerScope[requestedChangesIndex].length, "The extraction went missing? How?");
            Debug.assert(exposedVariableDeclarations.length === 0, "Extract constant accepted a range containing a variable declaration?");
            context.cancellationToken.throwIfCancellationRequested();
            const expression = isExpression(target) ? target : target.statements[0].expression;
            return extractConstantInScope(expression, scopes[requestedChangesIndex], usagesPerScope[requestedChangesIndex], targetRange.facts, context);
        }