function createJSSignatureHelpItems(argumentInfo, program, cancellationToken) {
            if (argumentInfo.invocation.kind === 2 /* Contextual */)
                return void 0;
            const expression = getExpressionFromInvocation(argumentInfo.invocation);
            const name = isPropertyAccessExpression(expression) ? expression.name.text : void 0;
            const typeChecker = program.getTypeChecker();
            return name === void 0 ? void 0 : firstDefined(program.getSourceFiles(), (sourceFile) => firstDefined(sourceFile.getNamedDeclarations().get(name), (declaration) => {
                const type = declaration.symbol && typeChecker.getTypeOfSymbolAtLocation(declaration.symbol, declaration);
                const callSignatures = type && type.getCallSignatures();
                if (callSignatures && callSignatures.length) {
                    return typeChecker.runWithCancellationToken(cancellationToken, (typeChecker2) => createSignatureHelpItems(callSignatures, callSignatures[0], argumentInfo, sourceFile, typeChecker2, 
                    /*useFullPrefix*/
                    true));
                }
            }));
        }