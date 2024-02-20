function visitExportAssignment(node) {
                return node.isExportEquals ? void 0 : node;
            }