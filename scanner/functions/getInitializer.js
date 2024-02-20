function getInitializer(checker, propertyDeclaration) {
            return getDefaultValueFromType(checker, checker.getTypeFromTypeNode(propertyDeclaration.type));
        }