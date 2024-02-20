function updateVariableStatement(node, modifiers, declarationList) {
                return node.modifiers !== modifiers || node.declarationList !== declarationList ? update(createVariableStatement(modifiers, declarationList), node) : node;
            }