function isFunctionLikeDeclarationKind(kind) {
            switch (kind) {
                case 259 /* FunctionDeclaration */:
                case 171 /* MethodDeclaration */:
                case 173 /* Constructor */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                    return true;
                default:
                    return false;
            }
        }