function getTypeForDeclarationFromJSDocComment(declaration) {
                const jsdocType = getJSDocType(declaration);
                if (jsdocType) {
                    return getTypeFromTypeNode(jsdocType);
                }
                return void 0;
            }