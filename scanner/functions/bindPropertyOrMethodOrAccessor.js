function bindPropertyOrMethodOrAccessor(node, symbolFlags, symbolExcludes) {
                if (!file.isDeclarationFile && !(node.flags & 16777216 /* Ambient */) && isAsyncFunction(node)) {
                    emitFlags |= 2048 /* HasAsyncFunctions */;
                }
                if (currentFlow && isObjectLiteralOrClassExpressionMethodOrAccessor(node)) {
                    node.flowNode = currentFlow;
                }
                return hasDynamicName(node) ? bindAnonymousDeclaration(node, symbolFlags, "__computed" /* Computed */) : declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes);
            }