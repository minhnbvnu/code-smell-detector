function isFunctionScopeBoundaryInStack(node) {
                if (classScopeStack.length === 0) {
                    return false;
                }
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                if (ts.isConstructorDeclaration(tsNode)) {
                    return false;
                }
                return tsutils.isFunctionScopeBoundary(tsNode);
            }