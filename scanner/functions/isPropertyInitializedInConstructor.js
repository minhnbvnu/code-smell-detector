function isPropertyInitializedInConstructor(propName, propType, constructor) {
                const reference = isComputedPropertyName(propName) ? factory.createElementAccessExpression(factory.createThis(), propName.expression) : factory.createPropertyAccessExpression(factory.createThis(), propName);
                setParent(reference.expression, reference);
                setParent(reference, constructor);
                reference.flowNode = constructor.returnFlowNode;
                const flowType = getFlowTypeOfReference(reference, propType, getOptionalType(propType));
                return !containsUndefinedType(flowType);
            }