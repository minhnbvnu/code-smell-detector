function createVariableStatement(modifiers, declarationList) {
                const node = createBaseNode(240 /* VariableStatement */);
                node.modifiers = asNodeArray(modifiers);
                node.declarationList = isArray(declarationList) ? createVariableDeclarationList(declarationList) : declarationList;
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.declarationList);
                if (modifiersToFlags(node.modifiers) & 2 /* Ambient */) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }