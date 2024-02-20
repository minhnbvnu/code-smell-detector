function makeObjectAssignmentPattern(factory2, elements) {
            Debug.assertEachNode(elements, isObjectBindingOrAssignmentElement);
            return factory2.createObjectLiteralExpression(map(elements, factory2.converters.convertToObjectAssignmentElement));
        }