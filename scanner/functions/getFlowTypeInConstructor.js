function getFlowTypeInConstructor(symbol, constructor) {
                const accessName = startsWith(symbol.escapedName, "__#") ? factory.createPrivateIdentifier(symbol.escapedName.split("@")[1]) : unescapeLeadingUnderscores(symbol.escapedName);
                const reference = factory.createPropertyAccessExpression(factory.createThis(), accessName);
                setParent(reference.expression, reference);
                setParent(reference, constructor);
                reference.flowNode = constructor.returnFlowNode;
                const flowType = getFlowTypeOfProperty(reference, symbol);
                if (noImplicitAny && (flowType === autoType || flowType === autoArrayType)) {
                    error(symbol.valueDeclaration, Diagnostics.Member_0_implicitly_has_an_1_type, symbolToString(symbol), typeToString(flowType));
                }
                return everyType(flowType, isNullableType) ? void 0 : convertAutoToAny(flowType);
            }