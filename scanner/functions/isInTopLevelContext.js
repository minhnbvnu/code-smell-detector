function isInTopLevelContext(node) {
            if (isIdentifier(node) && (isClassDeclaration(node.parent) || isFunctionDeclaration(node.parent)) && node.parent.name === node) {
                node = node.parent;
            }
            const container = getThisContainer(node, 
            /*includeArrowFunctions*/
            true, 
            /*includeClassComputedPropertyName*/
            false);
            return isSourceFile(container);
        }