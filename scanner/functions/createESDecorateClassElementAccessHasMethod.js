function createESDecorateClassElementAccessHasMethod(elementName) {
                const propertyName = elementName.computed ? elementName.name : isIdentifier(elementName.name) ? factory2.createStringLiteralFromNode(elementName.name) : elementName.name;
                return factory2.createPropertyAssignment("has", factory2.createArrowFunction(
                /*modifiers*/
                void 0, 
                /*typeParameters*/
                void 0, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.createIdentifier("obj"))], 
                /*type*/
                void 0, 
                /*equalsGreaterThanToken*/
                void 0, factory2.createBinaryExpression(propertyName, 101 /* InKeyword */, factory2.createIdentifier("obj"))));
            }