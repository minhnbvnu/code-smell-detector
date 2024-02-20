function makeChange5(changeTracker, sourceFile, pos, fixedNodes) {
            const token = getTokenAtPosition(sourceFile, pos);
            if (!isIdentifier(token)) {
                return;
            }
            const declaration = token.parent;
            if (declaration.kind === 169 /* PropertyDeclaration */ && (!fixedNodes || tryAddToSet(fixedNodes, declaration))) {
                changeTracker.insertModifierBefore(sourceFile, 136 /* DeclareKeyword */, declaration);
            }
        }