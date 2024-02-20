function isStatic(node) {
            return isClassElement(node) && hasStaticModifier(node) || isClassStaticBlockDeclaration(node);
        }