function isCommonJsExportedExpression(node) {
            if (!isInJSFile(node))
                return false;
            return isObjectLiteralExpression(node.parent) && isBinaryExpression(node.parent.parent) && getAssignmentDeclarationKind(node.parent.parent) === 2 /* ModuleExports */ || isCommonJsExportPropertyAssignment(node.parent);
        }