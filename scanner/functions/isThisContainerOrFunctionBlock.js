function isThisContainerOrFunctionBlock(node) {
            switch (node.kind) {
                case 216 /* ArrowFunction */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 169 /* PropertyDeclaration */:
                    return true;
                case 238 /* Block */:
                    switch (node.parent.kind) {
                        case 173 /* Constructor */:
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            return true;
                        default:
                            return false;
                    }
                default:
                    return false;
            }
        }