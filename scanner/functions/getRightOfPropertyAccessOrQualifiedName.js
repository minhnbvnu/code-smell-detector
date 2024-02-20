function getRightOfPropertyAccessOrQualifiedName(propertyAccessOrQualifiedName) {
            return isPropertyAccessExpression(propertyAccessOrQualifiedName) ? propertyAccessOrQualifiedName.name : propertyAccessOrQualifiedName.right;
        }