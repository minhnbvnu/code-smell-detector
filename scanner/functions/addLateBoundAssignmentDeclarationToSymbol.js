function addLateBoundAssignmentDeclarationToSymbol(node, symbol) {
                if (symbol) {
                    (symbol.assignmentDeclarationMembers || (symbol.assignmentDeclarationMembers = /* @__PURE__ */ new Map())).set(getNodeId(node), node);
                }
            }