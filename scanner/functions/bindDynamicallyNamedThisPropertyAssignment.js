function bindDynamicallyNamedThisPropertyAssignment(node, symbol, symbolTable) {
                declareSymbol(symbolTable, symbol, node, 4 /* Property */, 0 /* None */, 
                /*isReplaceableByMethod*/
                true, 
                /*isComputedName*/
                true);
                addLateBoundAssignmentDeclarationToSymbol(node, symbol);
            }