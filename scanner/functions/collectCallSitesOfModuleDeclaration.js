function collectCallSitesOfModuleDeclaration(node, collect) {
            if (!hasSyntacticModifier(node, 2 /* Ambient */) && node.body && isModuleBlock(node.body)) {
                forEach(node.body.statements, collect);
            }
        }