function checkForTypeAliasAssignment(node) {
                var _a;
                checkAndReportAssignmentSpace((_a = node.typeParameters) !== null && _a !== void 0 ? _a : node.id, node.typeAnnotation);
            }