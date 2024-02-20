function getCallHierarchItemContainerName(node) {
            var _a2, _b;
            if (isConstNamedExpression(node)) {
                if (isModuleBlock(node.parent.parent.parent.parent) && isIdentifier(node.parent.parent.parent.parent.parent.name)) {
                    return node.parent.parent.parent.parent.parent.name.getText();
                }
                return;
            }
            switch (node.kind) {
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 171 /* MethodDeclaration */:
                    if (node.parent.kind === 207 /* ObjectLiteralExpression */) {
                        return (_a2 = getAssignedName(node.parent)) == null ? void 0 : _a2.getText();
                    }
                    return (_b = getNameOfDeclaration(node.parent)) == null ? void 0 : _b.getText();
                case 259 /* FunctionDeclaration */:
                case 260 /* ClassDeclaration */:
                case 264 /* ModuleDeclaration */:
                    if (isModuleBlock(node.parent) && isIdentifier(node.parent.parent.name)) {
                        return node.parent.parent.name.getText();
                    }
            }
        }