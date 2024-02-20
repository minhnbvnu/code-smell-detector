function getNewTypeMetadata(node, container) {
                if (typeSerializer) {
                    let properties;
                    if (shouldAddTypeMetadata(node)) {
                        const typeProperty = factory2.createPropertyAssignment("type", factory2.createArrowFunction(
                        /*modifiers*/
                        void 0, 
                        /*typeParameters*/
                        void 0, [], 
                        /*type*/
                        void 0, factory2.createToken(38 /* EqualsGreaterThanToken */), typeSerializer.serializeTypeOfNode({ currentLexicalScope, currentNameScope: container }, node)));
                        properties = append(properties, typeProperty);
                    }
                    if (shouldAddParamTypesMetadata(node)) {
                        const paramTypeProperty = factory2.createPropertyAssignment("paramTypes", factory2.createArrowFunction(
                        /*modifiers*/
                        void 0, 
                        /*typeParameters*/
                        void 0, [], 
                        /*type*/
                        void 0, factory2.createToken(38 /* EqualsGreaterThanToken */), typeSerializer.serializeParameterTypesOfNode({ currentLexicalScope, currentNameScope: container }, node, container)));
                        properties = append(properties, paramTypeProperty);
                    }
                    if (shouldAddReturnTypeMetadata(node)) {
                        const returnTypeProperty = factory2.createPropertyAssignment("returnType", factory2.createArrowFunction(
                        /*modifiers*/
                        void 0, 
                        /*typeParameters*/
                        void 0, [], 
                        /*type*/
                        void 0, factory2.createToken(38 /* EqualsGreaterThanToken */), typeSerializer.serializeReturnTypeOfNode({ currentLexicalScope, currentNameScope: container }, node)));
                        properties = append(properties, returnTypeProperty);
                    }
                    if (properties) {
                        const typeInfoMetadata = emitHelpers().createMetadataHelper("design:typeinfo", factory2.createObjectLiteralExpression(properties, 
                        /*multiLine*/
                        true));
                        return [factory2.createDecorator(typeInfoMetadata)];
                    }
                }
            }