function createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause) {
                const node = createBaseDeclaration(275 /* ExportDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.isTypeOnly = isTypeOnly;
                node.exportClause = exportClause;
                node.moduleSpecifier = moduleSpecifier;
                node.assertClause = assertClause;
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.exportClause) | propagateChildFlags(node.moduleSpecifier);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }