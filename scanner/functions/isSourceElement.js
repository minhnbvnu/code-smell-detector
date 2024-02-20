function isSourceElement(node) {
            return isStatement(node) || node != null && node.type === 'FunctionDeclaration';
        }