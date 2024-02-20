function getExportKindForDeclaration(node2) {
                return hasSyntacticModifier(node2, 1024 /* Default */) ? 1 /* Default */ : 0 /* Named */;
            }