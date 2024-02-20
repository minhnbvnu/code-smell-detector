function getAdjustedLocationForDeclaration(node, forRename) {
            if (!forRename) {
                switch (node.kind) {
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                        return getAdjustedLocationForClass(node);
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                        return getAdjustedLocationForFunction(node);
                    case 173 /* Constructor */:
                        return node;
                }
            }
            if (isNamedDeclaration(node)) {
                return node.name;
            }
        }