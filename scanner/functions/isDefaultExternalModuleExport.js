function isDefaultExternalModuleExport(node) {
                return isExternalModuleExport(node) && hasSyntacticModifier(node, 1024 /* Default */);
            }