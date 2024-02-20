function checkImport(node) {
                if (ignoreImport) {
                    return;
                }
                if (node.imported.range[0] !== node.local.range[0] &&
                    astUtils.getModuleExportName(node.imported) === node.local.name) {
                    reportError(node, node.imported, "Import");
                }
            }