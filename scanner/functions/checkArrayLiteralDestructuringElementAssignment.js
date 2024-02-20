function checkArrayLiteralDestructuringElementAssignment(node, sourceType, elementIndex, elementType, checkMode) {
                const elements = node.elements;
                const element = elements[elementIndex];
                if (element.kind !== 229 /* OmittedExpression */) {
                    if (element.kind !== 227 /* SpreadElement */) {
                        const indexType = getNumberLiteralType(elementIndex);
                        if (isArrayLikeType(sourceType)) {
                            const accessFlags = 32 /* ExpressionPosition */ | (hasDefaultValue(element) ? 16 /* NoTupleBoundsCheck */ : 0);
                            const elementType2 = getIndexedAccessTypeOrUndefined(sourceType, indexType, accessFlags, createSyntheticExpression(element, indexType)) || errorType;
                            const assignedType = hasDefaultValue(element) ? getTypeWithFacts(elementType2, 524288 /* NEUndefined */) : elementType2;
                            const type = getFlowTypeOfDestructuring(element, assignedType);
                            return checkDestructuringAssignment(element, type, checkMode);
                        }
                        return checkDestructuringAssignment(element, elementType, checkMode);
                    }
                    if (elementIndex < elements.length - 1) {
                        error(element, Diagnostics.A_rest_element_must_be_last_in_a_destructuring_pattern);
                    }
                    else {
                        const restExpression = element.expression;
                        if (restExpression.kind === 223 /* BinaryExpression */ && restExpression.operatorToken.kind === 63 /* EqualsToken */) {
                            error(restExpression.operatorToken, Diagnostics.A_rest_element_cannot_have_an_initializer);
                        }
                        else {
                            checkGrammarForDisallowedTrailingComma(node.elements, Diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma);
                            const type = everyType(sourceType, isTupleType) ? mapType(sourceType, (t) => sliceTupleType(t, elementIndex)) : createArrayType(elementType);
                            return checkDestructuringAssignment(restExpression, type, checkMode);
                        }
                    }
                }
                return void 0;
            }