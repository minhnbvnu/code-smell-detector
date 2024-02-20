function createExpressionForShorthandPropertyAssignment(factory2, property, receiver) {
            return setOriginalNode(setTextRange(factory2.createAssignment(createMemberAccessForPropertyName(factory2, receiver, property.name, 
            /*location*/
            property.name), factory2.cloneNode(property.name)), 
            /*location*/
            property), 
            /*original*/
            property);
        }