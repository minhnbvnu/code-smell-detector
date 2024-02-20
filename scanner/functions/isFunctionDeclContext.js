function isFunctionDeclContext(context) {
            switch (context.contextNode.kind) {
                case 259 /* FunctionDeclaration */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 176 /* CallSignature */:
                case 215 /* FunctionExpression */:
                case 173 /* Constructor */:
                case 216 /* ArrowFunction */:
                case 261 /* InterfaceDeclaration */:
                    return true;
            }
            return false;
        }