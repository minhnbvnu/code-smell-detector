function isAnExternalModuleIndicatorNode(node) {
            return canHaveModifiers(node) && hasModifierOfKind(node, 93 /* ExportKeyword */) || isImportEqualsDeclaration(node) && isExternalModuleReference(node.moduleReference) || isImportDeclaration(node) || isExportAssignment(node) || isExportDeclaration(node) ? node : void 0;
        }