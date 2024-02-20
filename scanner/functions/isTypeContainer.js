function isTypeContainer(node) {
            switch (node.kind) {
                case 231 /* AsExpression */:
                case 176 /* CallSignature */:
                case 177 /* ConstructSignature */:
                case 259 /* FunctionDeclaration */:
                case 174 /* GetAccessor */:
                case 178 /* IndexSignature */:
                case 197 /* MappedType */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 166 /* Parameter */:
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                case 175 /* SetAccessor */:
                case 262 /* TypeAliasDeclaration */:
                case 213 /* TypeAssertionExpression */:
                case 257 /* VariableDeclaration */:
                    return true;
                default:
                    return false;
            }
        }