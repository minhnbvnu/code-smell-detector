function getInfo16(sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            const indexSignature = tryCast(token.parent.parent, isIndexSignatureDeclaration);
            if (!indexSignature)
                return void 0;
            const container = isInterfaceDeclaration(indexSignature.parent) ? indexSignature.parent : tryCast(indexSignature.parent.parent, isTypeAliasDeclaration);
            if (!container)
                return void 0;
            return { indexSignature, container };
        }