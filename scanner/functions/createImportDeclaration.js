function createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause) {
                const node = createBaseNode(269 /* ImportDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.importClause = importClause;
                node.moduleSpecifier = moduleSpecifier;
                node.assertClause = assertClause;
                node.transformFlags |= propagateChildFlags(node.importClause) | propagateChildFlags(node.moduleSpecifier);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }