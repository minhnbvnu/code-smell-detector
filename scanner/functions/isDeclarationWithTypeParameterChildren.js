function isDeclarationWithTypeParameterChildren(node) {
            Debug.type(node);
            switch (node.kind) {
                case 176 /* CallSignature */:
                case 177 /* ConstructSignature */:
                case 170 /* MethodSignature */:
                case 178 /* IndexSignature */:
                case 181 /* FunctionType */:
                case 182 /* ConstructorType */:
                case 320 /* JSDocFunctionType */:
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 261 /* InterfaceDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                case 348 /* JSDocTemplateTag */:
                case 259 /* FunctionDeclaration */:
                case 171 /* MethodDeclaration */:
                case 173 /* Constructor */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                    return true;
                default:
                    assertType(node);
                    return false;
            }
        }