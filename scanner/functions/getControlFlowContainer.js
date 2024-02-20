function getControlFlowContainer(node) {
                return findAncestor(node.parent, (node2) => isFunctionLike(node2) && !getImmediatelyInvokedFunctionExpression(node2) || node2.kind === 265 /* ModuleBlock */ || node2.kind === 308 /* SourceFile */ || node2.kind === 169 /* PropertyDeclaration */);
            }