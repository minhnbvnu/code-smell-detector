function makeArrayBindingPattern(factory2, elements) {
            Debug.assertEachNode(elements, isArrayBindingElement);
            return factory2.createArrayBindingPattern(elements);
        }