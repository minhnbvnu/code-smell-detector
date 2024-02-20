function isOptionalDeclaration(declaration) {
            switch (declaration.kind) {
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                    return !!declaration.questionToken;
                case 166 /* Parameter */:
                    return !!declaration.questionToken || isJSDocOptionalParameter(declaration);
                case 351 /* JSDocPropertyTag */:
                case 344 /* JSDocParameterTag */:
                    return isOptionalJSDocPropertyLikeTag(declaration);
                default:
                    return false;
            }
        }