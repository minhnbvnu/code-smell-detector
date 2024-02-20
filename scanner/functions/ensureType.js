function ensureType(node, type, ignorePrivate) {
                if (!ignorePrivate && hasEffectiveModifier(node, 8 /* Private */)) {
                    return;
                }
                if (shouldPrintWithInitializer(node)) {
                    return;
                }
                const shouldUseResolverType = node.kind === 166 /* Parameter */ && (resolver.isRequiredInitializedParameter(node) || resolver.isOptionalUninitializedParameterProperty(node));
                if (type && !shouldUseResolverType) {
                    return visitNode(type, visitDeclarationSubtree, isTypeNode);
                }
                if (!getParseTreeNode(node)) {
                    return type ? visitNode(type, visitDeclarationSubtree, isTypeNode) : factory2.createKeywordTypeNode(131 /* AnyKeyword */);
                }
                if (node.kind === 175 /* SetAccessor */) {
                    return factory2.createKeywordTypeNode(131 /* AnyKeyword */);
                }
                errorNameNode = node.name;
                let oldDiag;
                if (!suppressNewDiagnosticContexts) {
                    oldDiag = getSymbolAccessibilityDiagnostic;
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(node);
                }
                if (node.kind === 257 /* VariableDeclaration */ || node.kind === 205 /* BindingElement */) {
                    return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
                }
                if (node.kind === 166 /* Parameter */ || node.kind === 169 /* PropertyDeclaration */ || node.kind === 168 /* PropertySignature */) {
                    if (isPropertySignature(node) || !node.initializer)
                        return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker, shouldUseResolverType));
                    return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker, shouldUseResolverType) || resolver.createTypeOfExpression(node.initializer, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
                }
                return cleanup(resolver.createReturnTypeOfSignatureDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
                function cleanup(returnValue) {
                    errorNameNode = void 0;
                    if (!suppressNewDiagnosticContexts) {
                        getSymbolAccessibilityDiagnostic = oldDiag;
                    }
                    return returnValue || factory2.createKeywordTypeNode(131 /* AnyKeyword */);
                }
            }