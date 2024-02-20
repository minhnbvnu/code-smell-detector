function isExportOfNamespace(node) {
                return currentNamespace !== void 0 && hasSyntacticModifier(node, 1 /* Export */);
            }