function createBlock(statements, multiLine) {
                const node = createBaseNode(238 /* Block */);
                node.statements = createNodeArray(statements);
                node.multiLine = multiLine;
                node.transformFlags |= propagateChildrenFlags(node.statements);
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }