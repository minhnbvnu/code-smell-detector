function isDeclarationWithTypeParameters(node) {
            Debug.type(node);
            switch (node.kind) {
                case 341 /* JSDocCallbackTag */:
                case 349 /* JSDocTypedefTag */:
                case 326 /* JSDocSignature */:
                    return true;
                default:
                    assertType(node);
                    return isDeclarationWithTypeParameterChildren(node);
            }
        }