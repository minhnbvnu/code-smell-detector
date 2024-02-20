function getExternalModuleImportEqualsDeclarationExpression(node) {
            Debug.assert(isExternalModuleImportEqualsDeclaration(node));
            return node.moduleReference.expression;
        }