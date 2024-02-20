function checkModuleDeclForExportEquals(node) {
                const cached = MODULE_DECL_CACHE.get(node);
                if (cached != null) {
                    return cached;
                }
                if (node.body && node.body.type === utils_1.AST_NODE_TYPES.TSModuleBlock) {
                    for (const statement of node.body.body) {
                        if (statement.type === utils_1.AST_NODE_TYPES.TSExportAssignment) {
                            MODULE_DECL_CACHE.set(node, true);
                            return true;
                        }
                    }
                }
                MODULE_DECL_CACHE.set(node, false);
                return false;
            }