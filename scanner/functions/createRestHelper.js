function createRestHelper(value, elements, computedTempVariables, location) {
                context.requestEmitHelper(restHelper);
                const propertyNames = [];
                let computedTempVariableOffset = 0;
                for (let i = 0; i < elements.length - 1; i++) {
                    const propertyName = getPropertyNameOfBindingOrAssignmentElement(elements[i]);
                    if (propertyName) {
                        if (isComputedPropertyName(propertyName)) {
                            Debug.assertIsDefined(computedTempVariables, "Encountered computed property name but 'computedTempVariables' argument was not provided.");
                            const temp = computedTempVariables[computedTempVariableOffset];
                            computedTempVariableOffset++;
                            propertyNames.push(factory2.createConditionalExpression(factory2.createTypeCheck(temp, "symbol"), 
                            /*questionToken*/
                            void 0, temp, 
                            /*colonToken*/
                            void 0, factory2.createAdd(temp, factory2.createStringLiteral(""))));
                        }
                        else {
                            propertyNames.push(factory2.createStringLiteralFromNode(propertyName));
                        }
                    }
                }
                return factory2.createCallExpression(getUnscopedHelperName("__rest"), 
                /*typeArguments*/
                void 0, [
                    value,
                    setTextRange(factory2.createArrayLiteralExpression(propertyNames), location)
                ]);
            }