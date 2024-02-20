function getLeftOfPropertyAccessOrQualifiedName(propertyAccessOrQualifiedName) {
            return isPropertyAccessExpression(propertyAccessOrQualifiedName) ? propertyAccessOrQualifiedName.expression : propertyAccessOrQualifiedName.left;
        }