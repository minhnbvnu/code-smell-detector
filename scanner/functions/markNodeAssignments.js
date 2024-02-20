function markNodeAssignments(node) {
                if (node.kind === 79 /* Identifier */) {
                    if (isAssignmentTarget(node)) {
                        const symbol = getResolvedSymbol(node);
                        if (isParameterOrCatchClauseVariable(symbol)) {
                            symbol.isAssigned = true;
                        }
                    }
                }
                else {
                    forEachChild(node, markNodeAssignments);
                }
            }