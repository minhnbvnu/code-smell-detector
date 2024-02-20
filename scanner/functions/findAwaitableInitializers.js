function findAwaitableInitializers(expression, sourceFile, cancellationToken, program, checker) {
            const identifiers = getIdentifiersFromErrorSpanExpression(expression, checker);
            if (!identifiers) {
                return;
            }
            let isCompleteFix = identifiers.isCompleteFix;
            let initializers;
            for (const identifier of identifiers.identifiers) {
                const symbol = checker.getSymbolAtLocation(identifier);
                if (!symbol) {
                    continue;
                }
                const declaration = tryCast(symbol.valueDeclaration, isVariableDeclaration);
                const variableName = declaration && tryCast(declaration.name, isIdentifier);
                const variableStatement = getAncestor(declaration, 240 /* VariableStatement */);
                if (!declaration || !variableStatement || declaration.type || !declaration.initializer || variableStatement.getSourceFile() !== sourceFile || hasSyntacticModifier(variableStatement, 1 /* Export */) || !variableName || !isInsideAwaitableBody(declaration.initializer)) {
                    isCompleteFix = false;
                    continue;
                }
                const diagnostics = program.getSemanticDiagnostics(sourceFile, cancellationToken);
                const isUsedElsewhere = ts_FindAllReferences_exports.Core.eachSymbolReferenceInFile(variableName, checker, sourceFile, (reference) => {
                    return identifier !== reference && !symbolReferenceIsAlsoMissingAwait(reference, diagnostics, sourceFile, checker);
                });
                if (isUsedElsewhere) {
                    isCompleteFix = false;
                    continue;
                }
                (initializers || (initializers = [])).push({
                    expression: declaration.initializer,
                    declarationSymbol: symbol
                });
            }
            return initializers && {
                initializers,
                needsSecondPassForFixAll: !isCompleteFix
            };
        }