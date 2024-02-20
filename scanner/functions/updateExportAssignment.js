function updateExportAssignment(node, modifiers, expression) {
                return node.modifiers !== modifiers || node.expression !== expression ? update(createExportAssignment2(modifiers, node.isExportEquals, expression), node) : node;
            }