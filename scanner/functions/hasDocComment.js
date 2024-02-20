function hasDocComment(sourceFile, position) {
            const token = getTokenAtPosition(sourceFile, position);
            return !!findAncestor(token, isJSDoc);
        }