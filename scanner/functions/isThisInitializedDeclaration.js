function isThisInitializedDeclaration(node) {
            var _a2;
            return !!node && isVariableDeclaration(node) && ((_a2 = node.initializer) == null ? void 0 : _a2.kind) === 108 /* ThisKeyword */;
        }