function hasUsableJSDoc(decl) {
            return isFunctionLikeDeclaration(decl) ? decl.parameters.some(hasUsableJSDoc) || !decl.type && !!getJSDocReturnType(decl) : !decl.type && !!getJSDocType(decl);
        }