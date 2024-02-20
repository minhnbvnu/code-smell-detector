function createESDecorateClassElementAccessGetMethod(elementName) {
                const accessor = elementName.computed ? factory2.createElementAccessExpression(factory2.createIdentifier("obj"), elementName.name) : factory2.createPropertyAccessExpression(factory2.createIdentifier("obj"), elementName.name);
                return factory2.createPropertyAssignment("get", factory2.createArrowFunction(
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
                void 0, accessor));
            }