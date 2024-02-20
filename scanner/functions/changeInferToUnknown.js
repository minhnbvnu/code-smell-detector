function changeInferToUnknown(changes, sourceFile, token) {
            changes.replaceNode(sourceFile, token.parent, factory.createKeywordTypeNode(157 /* UnknownKeyword */));
        }