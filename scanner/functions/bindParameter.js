function bindParameter(node) {
                if (node.kind === 344 /* JSDocParameterTag */ && container.kind !== 326 /* JSDocSignature */) {
                    return;
                }
                if (inStrictMode && !(node.flags & 16777216 /* Ambient */)) {
                    checkStrictModeEvalOrArguments(node, node.name);
                }
                if (isBindingPattern(node.name)) {
                    bindAnonymousDeclaration(node, 1 /* FunctionScopedVariable */, "__" + node.parent.parameters.indexOf(node));
                }
                else {
                    declareSymbolAndAddToSymbolTable(node, 1 /* FunctionScopedVariable */, 111551 /* ParameterExcludes */);
                }
                if (isParameterPropertyDeclaration(node, node.parent)) {
                    const classDeclaration = node.parent.parent;
                    declareSymbol(classDeclaration.symbol.members, classDeclaration.symbol, node, 4 /* Property */ | (node.questionToken ? 16777216 /* Optional */ : 0 /* None */), 0 /* PropertyExcludes */);
                }
            }