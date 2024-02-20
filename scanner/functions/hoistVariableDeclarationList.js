function hoistVariableDeclarationList(node) {
                forEach(node.declarations, hoistVariable);
            }