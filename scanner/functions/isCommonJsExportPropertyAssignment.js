function isCommonJsExportPropertyAssignment(node) {
            if (!isInJSFile(node))
                return false;
            return isBinaryExpression(node) && getAssignmentDeclarationKind(node) === 1 /* ExportsProperty */;
        }