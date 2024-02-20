function getExportAssignmentExpression(node) {
            return isExportAssignment(node) ? node.expression : node.right;
        }