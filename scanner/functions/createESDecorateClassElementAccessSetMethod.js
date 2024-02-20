function createESDecorateClassElementAccessSetMethod(elementName) {
                const accessor = elementName.computed ? factory2.createElementAccessExpression(factory2.createIdentifier("obj"), elementName.name) : factory2.createPropertyAccessExpression(factory2.createIdentifier("obj"), elementName.name);
                return factory2.createPropertyAssignment("set", factory2.createArrowFunction(
                /*modifiers*/
                void 0, 
                /*typeParameters*/
                void 0, [
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.createIdentifier("obj")),
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.createIdentifier("value"))
                ], 
                /*type*/
                void 0, 
                /*equalsGreaterThanToken*/
                void 0, factory2.createBlock([
                    factory2.createExpressionStatement(factory2.createAssignment(accessor, factory2.createIdentifier("value")))
                ])));
            }