function isFunctionLikeKind(kind) {
            switch (kind) {
                case 170 /* MethodSignature */:
                case 176 /* CallSignature */:
                case 326 /* JSDocSignature */:
                case 177 /* ConstructSignature */:
                case 178 /* IndexSignature */:
                case 181 /* FunctionType */:
                case 320 /* JSDocFunctionType */:
                case 182 /* ConstructorType */:
                    return true;
                default:
                    return isFunctionLikeDeclarationKind(kind);
            }
        }