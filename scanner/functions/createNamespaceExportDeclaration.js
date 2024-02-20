function createNamespaceExportDeclaration(name) {
                const node = createBaseDeclaration(267 /* NamespaceExportDeclaration */);
                node.name = asName(name);
                node.transformFlags |= propagateIdentifierNameFlags(node.name) | 1 /* ContainsTypeScript */;
                node.modifiers = void 0;
                node.jsDoc = void 0;
                return node;
            }