function getDeclarationSiteFix(context, expression, errorCode, checker, trackChanges, fixedDeclarations) {
            const { sourceFile, program, cancellationToken } = context;
            const awaitableInitializers = findAwaitableInitializers(expression, sourceFile, cancellationToken, program, checker);
            if (awaitableInitializers) {
                const initializerChanges = trackChanges((t) => {
                    forEach(awaitableInitializers.initializers, ({ expression: expression2 }) => makeChange3(t, errorCode, sourceFile, checker, expression2, fixedDeclarations));
                    if (fixedDeclarations && awaitableInitializers.needsSecondPassForFixAll) {
                        makeChange3(t, errorCode, sourceFile, checker, expression, fixedDeclarations);
                    }
                });
                return createCodeFixActionWithoutFixAll("addMissingAwaitToInitializer", initializerChanges, awaitableInitializers.initializers.length === 1 ? [Diagnostics.Add_await_to_initializer_for_0, awaitableInitializers.initializers[0].declarationSymbol.name] : Diagnostics.Add_await_to_initializers);
            }
        }