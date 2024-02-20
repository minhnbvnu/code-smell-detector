function exportAssignmentIsAlias(node) {
            const e = getExportAssignmentExpression(node);
            return isAliasableExpression(e);
        }