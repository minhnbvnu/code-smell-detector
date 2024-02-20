function makeArrayAssignmentPattern(factory2, elements) {
            Debug.assertEachNode(elements, isArrayBindingOrAssignmentElement);
            return factory2.createArrayLiteralExpression(map(elements, factory2.converters.convertToArrayAssignmentElement));
        }