function checkName(node) {
                let oldDiag;
                if (!suppressNewDiagnosticContexts) {
                    oldDiag = getSymbolAccessibilityDiagnostic;
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNodeName(node);
                }
                errorNameNode = node.name;
                Debug.assert(resolver.isLateBound(getParseTreeNode(node)));
                const decl = node;
                const entityName = decl.name.expression;
                checkEntityNameVisibility(entityName, enclosingDeclaration);
                if (!suppressNewDiagnosticContexts) {
                    getSymbolAccessibilityDiagnostic = oldDiag;
                }
                errorNameNode = void 0;
            }