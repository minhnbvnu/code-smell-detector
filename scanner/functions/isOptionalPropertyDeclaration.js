function isOptionalPropertyDeclaration(node) {
                return isPropertyDeclaration(node) && !hasAccessorModifier(node) && node.questionToken;
            }