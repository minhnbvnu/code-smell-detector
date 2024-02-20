function annotateParameters(changes, importAdder, sourceFile, parameterDeclaration, containingFunction, program, host, cancellationToken) {
            if (!isIdentifier(parameterDeclaration.name)) {
                return;
            }
            const parameterInferences = inferTypeForParametersFromUsage(containingFunction, sourceFile, program, cancellationToken);
            Debug.assert(containingFunction.parameters.length === parameterInferences.length, "Parameter count and inference count should match");
            if (isInJSFile(containingFunction)) {
                annotateJSDocParameters(changes, sourceFile, parameterInferences, program, host);
            }
            else {
                const needParens = isArrowFunction(containingFunction) && !findChildOfKind(containingFunction, 20 /* OpenParenToken */, sourceFile);
                if (needParens)
                    changes.insertNodeBefore(sourceFile, first(containingFunction.parameters), factory.createToken(20 /* OpenParenToken */));
                for (const { declaration, type } of parameterInferences) {
                    if (declaration && !declaration.type && !declaration.initializer) {
                        annotate(changes, importAdder, sourceFile, declaration, type, program, host);
                    }
                }
                if (needParens)
                    changes.insertNodeAfter(sourceFile, last(containingFunction.parameters), factory.createToken(21 /* CloseParenToken */));
            }
        }