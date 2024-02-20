function checkTypeParameter(node) {
                checkGrammarModifiers(node);
                if (node.expression) {
                    grammarErrorOnFirstToken(node.expression, Diagnostics.Type_expected);
                }
                checkSourceElement(node.constraint);
                checkSourceElement(node.default);
                const typeParameter = getDeclaredTypeOfTypeParameter(getSymbolOfDeclaration(node));
                getBaseConstraintOfType(typeParameter);
                if (!hasNonCircularTypeParameterDefault(typeParameter)) {
                    error(node.default, Diagnostics.Type_parameter_0_has_a_circular_default, typeToString(typeParameter));
                }
                const constraintType = getConstraintOfTypeParameter(typeParameter);
                const defaultType = getDefaultFromTypeParameter(typeParameter);
                if (constraintType && defaultType) {
                    checkTypeAssignableTo(defaultType, getTypeWithThisArgument(instantiateType(constraintType, makeUnaryTypeMapper(typeParameter, defaultType)), defaultType), node.default, Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                }
                checkNodeDeferred(node);
                addLazyDiagnostic(() => checkTypeNameIsReserved(node.name, Diagnostics.Type_parameter_name_cannot_be_0));
            }