function createEnumDeclaration(modifiers, name, members) {
                const node = createBaseDeclaration(263 /* EnumDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.members = createNodeArray(members);
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.name) | propagateChildrenFlags(node.members) | 1 /* ContainsTypeScript */;
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }