function getInitialType(node) {
                return node.kind === 257 /* VariableDeclaration */ ? getInitialTypeOfVariableDeclaration(node) : getInitialTypeOfBindingElement(node);
            }