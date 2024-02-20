function isProcessedComponent(node) {
            switch (node.kind) {
                case 177 /* ConstructSignature */:
                case 173 /* Constructor */:
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                case 170 /* MethodSignature */:
                case 176 /* CallSignature */:
                case 178 /* IndexSignature */:
                case 257 /* VariableDeclaration */:
                case 165 /* TypeParameter */:
                case 230 /* ExpressionWithTypeArguments */:
                case 180 /* TypeReference */:
                case 191 /* ConditionalType */:
                case 181 /* FunctionType */:
                case 182 /* ConstructorType */:
                case 202 /* ImportType */:
                    return true;
            }
            return false;
        }