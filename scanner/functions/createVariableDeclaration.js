function createVariableDeclaration(name, exclamationToken, type, initializer) {
                var _a2;
                const node = createBaseDeclaration(257 /* VariableDeclaration */);
                node.name = asName(name);
                node.exclamationToken = exclamationToken;
                node.type = type;
                node.initializer = asInitializer(initializer);
                node.transformFlags |= propagateNameFlags(node.name) | propagateChildFlags(node.initializer) | (((_a2 = node.exclamationToken) != null ? _a2 : node.type) ? 1 /* ContainsTypeScript */ : 0 /* None */);
                node.jsDoc = void 0;
                return node;
            }