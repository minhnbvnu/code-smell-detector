function getInitialTypeOfVariableDeclaration(node) {
                if (node.initializer) {
                    return getTypeOfInitializer(node.initializer);
                }
                if (node.parent.parent.kind === 246 /* ForInStatement */) {
                    return stringType;
                }
                if (node.parent.parent.kind === 247 /* ForOfStatement */) {
                    return checkRightHandSideOfForOf(node.parent.parent) || errorType;
                }
                return errorType;
            }