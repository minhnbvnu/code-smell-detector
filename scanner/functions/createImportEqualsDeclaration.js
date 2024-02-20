function createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference) {
                const node = createBaseDeclaration(268 /* ImportEqualsDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.isTypeOnly = isTypeOnly;
                node.moduleReference = moduleReference;
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateIdentifierNameFlags(node.name) | propagateChildFlags(node.moduleReference);
                if (!isExternalModuleReference(node.moduleReference)) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }