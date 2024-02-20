function isNameOfModuleDeclaration(node) {
            var _a2;
            return ((_a2 = tryCast(node.parent, isModuleDeclaration)) == null ? void 0 : _a2.name) === node;
        }