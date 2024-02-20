function makeObjectBindingPattern(factory2, elements) {
            Debug.assertEachNode(elements, isBindingElement);
            return factory2.createObjectBindingPattern(elements);
        }