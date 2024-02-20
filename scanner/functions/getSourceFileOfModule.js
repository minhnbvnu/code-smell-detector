function getSourceFileOfModule(module2) {
            return getSourceFileOfNode(module2.valueDeclaration || getNonAugmentationDeclaration(module2));
        }