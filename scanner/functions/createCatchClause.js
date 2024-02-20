function createCatchClause(variableDeclaration, block) {
                const node = createBaseNode(295 /* CatchClause */);
                node.variableDeclaration = asVariableDeclaration(variableDeclaration);
                node.block = block;
                node.transformFlags |= propagateChildFlags(node.variableDeclaration) | propagateChildFlags(node.block) | (!variableDeclaration ? 64 /* ContainsES2019 */ : 0 /* None */);
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }