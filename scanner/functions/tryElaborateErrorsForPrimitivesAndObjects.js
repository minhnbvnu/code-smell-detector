function tryElaborateErrorsForPrimitivesAndObjects(source2, target2) {
                    const sourceType = symbolValueDeclarationIsContextSensitive(source2.symbol) ? typeToString(source2, source2.symbol.valueDeclaration) : typeToString(source2);
                    const targetType = symbolValueDeclarationIsContextSensitive(target2.symbol) ? typeToString(target2, target2.symbol.valueDeclaration) : typeToString(target2);
                    if (globalStringType === source2 && stringType === target2 || globalNumberType === source2 && numberType === target2 || globalBooleanType === source2 && booleanType === target2 || getGlobalESSymbolType() === source2 && esSymbolType === target2) {
                        reportError(Diagnostics._0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible, targetType, sourceType);
                    }
                }