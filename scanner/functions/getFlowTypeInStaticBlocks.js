function getFlowTypeInStaticBlocks(symbol, staticBlocks) {
                const accessName = startsWith(symbol.escapedName, "__#") ? factory.createPrivateIdentifier(symbol.escapedName.split("@")[1]) : unescapeLeadingUnderscores(symbol.escapedName);
                for (const staticBlock of staticBlocks) {
                    const reference = factory.createPropertyAccessExpression(factory.createThis(), accessName);
                    setParent(reference.expression, reference);
                    setParent(reference, staticBlock);
                    reference.flowNode = staticBlock.returnFlowNode;
                    const flowType = getFlowTypeOfProperty(reference, symbol);
                    if (noImplicitAny && (flowType === autoType || flowType === autoArrayType)) {
                        error(symbol.valueDeclaration, Diagnostics.Member_0_implicitly_has_an_1_type, symbolToString(symbol), typeToString(flowType));
                    }
                    if (everyType(flowType, isNullableType)) {
                        continue;
                    }
                    return convertAutoToAny(flowType);
                }
            }