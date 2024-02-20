function introducesArgumentsExoticObject(node) {
            switch (node.kind) {
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 173 /* Constructor */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                    return true;
            }
            return false;
        }