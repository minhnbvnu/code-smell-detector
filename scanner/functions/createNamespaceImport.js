function createNamespaceImport(name) {
                const node = createBaseDeclaration(271 /* NamespaceImport */);
                node.name = name;
                node.transformFlags |= propagateChildFlags(node.name);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }