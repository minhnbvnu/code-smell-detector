function canBeConvertedToAsync(node) {
            switch (node.kind) {
                case 259 /* FunctionDeclaration */:
                case 171 /* MethodDeclaration */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                    return true;
                default:
                    return false;
            }
        }