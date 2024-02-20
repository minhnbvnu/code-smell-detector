function collectCallSitesOfSourceFile(node, collect) {
            forEach(node.statements, collect);
        }