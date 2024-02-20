function createImportSpecifier(isTypeOnly, propertyName, name) {
                const node = createBaseDeclaration(273 /* ImportSpecifier */);
                node.isTypeOnly = isTypeOnly;
                node.propertyName = propertyName;
                node.name = name;
                node.transformFlags |= propagateChildFlags(node.propertyName) | propagateChildFlags(node.name);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }