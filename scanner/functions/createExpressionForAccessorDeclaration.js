function createExpressionForAccessorDeclaration(factory2, properties, property, receiver, multiLine) {
            const { firstAccessor, getAccessor, setAccessor } = getAllAccessorDeclarations(properties, property);
            if (property === firstAccessor) {
                return setTextRange(factory2.createObjectDefinePropertyCall(receiver, createExpressionForPropertyName(factory2, property.name), factory2.createPropertyDescriptor({
                    enumerable: factory2.createFalse(),
                    configurable: true,
                    get: getAccessor && setTextRange(setOriginalNode(factory2.createFunctionExpression(getModifiers(getAccessor), 
                    /*asteriskToken*/
                    void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, getAccessor.parameters, 
                    /*type*/
                    void 0, getAccessor.body
                    // TODO: GH#18217
                    ), getAccessor), getAccessor),
                    set: setAccessor && setTextRange(setOriginalNode(factory2.createFunctionExpression(getModifiers(setAccessor), 
                    /*asteriskToken*/
                    void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, setAccessor.parameters, 
                    /*type*/
                    void 0, setAccessor.body
                    // TODO: GH#18217
                    ), setAccessor), setAccessor)
                }, !multiLine)), firstAccessor);
            }
            return void 0;
        }