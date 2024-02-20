function getFunctionExtractionAtIndex(targetRange, context, requestedChangesIndex) {
            const { scopes, readsAndWrites: { target, usagesPerScope, functionErrorsPerScope, exposedVariableDeclarations } } = getPossibleExtractionsWorker(targetRange, context);
            Debug.assert(!functionErrorsPerScope[requestedChangesIndex].length, "The extraction went missing? How?");
            context.cancellationToken.throwIfCancellationRequested();
            return extractFunctionInScope(target, scopes[requestedChangesIndex], usagesPerScope[requestedChangesIndex], exposedVariableDeclarations, targetRange, context);
        }