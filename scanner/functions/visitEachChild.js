function visitEachChild(node, visitor, context, nodesVisitor = visitNodes2, tokenVisitor, nodeVisitor = visitNode) {
            if (node === void 0) {
                return void 0;
            }
            const fn = visitEachChildTable[node.kind];
            return fn === void 0 ? node : fn(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor);
        }