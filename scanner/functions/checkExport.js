function checkExport(node) {
                if (ignoreExport) {
                    return;
                }
                if (node.local.range[0] !== node.exported.range[0] &&
                    astUtils.getModuleExportName(node.local) === astUtils.getModuleExportName(node.exported)) {
                    reportError(node, node.local, "Export");
                }
            }