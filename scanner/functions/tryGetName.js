function tryGetName(node) {
            if (node.kind === 264 /* ModuleDeclaration */) {
                return getModuleName(node);
            }
            const declName = getNameOfDeclaration(node);
            if (declName && isPropertyName(declName)) {
                const propertyName = getPropertyNameForPropertyNameNode(declName);
                return propertyName && unescapeLeadingUnderscores(propertyName);
            }
            switch (node.kind) {
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                case 228 /* ClassExpression */:
                    return getFunctionOrClassName(node);
                default:
                    return void 0;
            }
        }