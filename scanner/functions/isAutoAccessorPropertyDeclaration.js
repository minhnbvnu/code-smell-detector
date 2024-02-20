function isAutoAccessorPropertyDeclaration(node) {
            return isPropertyDeclaration(node) && hasAccessorModifier(node);
        }