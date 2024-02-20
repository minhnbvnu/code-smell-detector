function createModuleBlock(statements) {
                const node = createBaseNode(265 /* ModuleBlock */);
                node.statements = createNodeArray(statements);
                node.transformFlags |= propagateChildrenFlags(node.statements);
                node.jsDoc = void 0;
                return node;
            }