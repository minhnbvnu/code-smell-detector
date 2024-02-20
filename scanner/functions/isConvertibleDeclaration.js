function isConvertibleDeclaration(node) {
            switch (node.kind) {
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                case 171 /* MethodDeclaration */:
                    return true;
                default:
                    return false;
            }
        }