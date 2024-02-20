function isSyntacticDefault(node) {
                return isExportAssignment(node) && !node.isExportEquals || hasSyntacticModifier(node, 1024 /* Default */) || isExportSpecifier(node);
            }