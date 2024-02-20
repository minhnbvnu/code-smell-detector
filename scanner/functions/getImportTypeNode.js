function getImportTypeNode(sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            Debug.assert(token.kind === 100 /* ImportKeyword */, "This token should be an ImportKeyword");
            Debug.assert(token.parent.kind === 202 /* ImportType */, "Token parent should be an ImportType");
            return token.parent;
        }