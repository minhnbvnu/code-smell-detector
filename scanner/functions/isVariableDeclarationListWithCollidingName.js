function isVariableDeclarationListWithCollidingName(node) {
                return !!node && isVariableDeclarationList(node) && !(node.flags & 3 /* BlockScoped */) && node.declarations.some(collidesWithParameterName);
            }