function getVariableDeclaration(property) {
            const variableDeclaration = findAncestor(property, (node) => isFunctionBlock(node) || isArrowFunctionBody(node) || isBindingPattern(node) ? "quit" : isVariableDeclaration(node));
            return variableDeclaration;
        }