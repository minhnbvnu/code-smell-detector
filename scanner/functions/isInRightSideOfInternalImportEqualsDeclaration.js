function isInRightSideOfInternalImportEqualsDeclaration(node) {
            while (node.parent.kind === 163 /* QualifiedName */) {
                node = node.parent;
            }
            return isInternalModuleImportEqualsDeclaration(node.parent) && node.parent.moduleReference === node;
        }