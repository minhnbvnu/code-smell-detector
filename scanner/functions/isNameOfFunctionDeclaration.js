function isNameOfFunctionDeclaration(node) {
            var _a2;
            return isIdentifier(node) && ((_a2 = tryCast(node.parent, isFunctionLike)) == null ? void 0 : _a2.name) === node;
        }