function forEachDeclaredVariable(declarationList, cb) {
        for (const declaration of declarationList.declarations) {
            let result;
            if (declaration.name.kind === ts.SyntaxKind.Identifier) {
                result = cb(declaration);
            }
            else {
                result = forEachDestructuringIdentifier(declaration.name, cb);
            }
            if (result)
                return result;
        }
    }