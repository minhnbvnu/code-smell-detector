function createExpressionForPropertyAssignment(factory2, property, receiver) {
            return setOriginalNode(setTextRange(factory2.createAssignment(createMemberAccessForPropertyName(factory2, receiver, property.name, 
            /*location*/
            property.name), property.initializer), property), property);
        }