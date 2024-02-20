function getInfo11(sourceFile, pos, checker) {
            const decl = findAncestor(getTokenAtPosition(sourceFile, pos), isTypeContainer);
            const typeNode = decl && decl.type;
            return typeNode && { typeNode, type: getType(checker, typeNode) };
        }