function createImportClause(isTypeOnly, name, namedBindings) {
                const node = createBaseDeclaration(270 /* ImportClause */);
                node.isTypeOnly = isTypeOnly;
                node.name = name;
                node.namedBindings = namedBindings;
                node.transformFlags |= propagateChildFlags(node.name) | propagateChildFlags(node.namedBindings);
                if (isTypeOnly) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }