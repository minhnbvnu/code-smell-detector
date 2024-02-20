function isExpressionOfExternalModuleImportEqualsDeclaration(node) {
            return isExternalModuleImportEqualsDeclaration(node.parent.parent) && getExternalModuleImportEqualsDeclarationExpression(node.parent.parent) === node;
        }