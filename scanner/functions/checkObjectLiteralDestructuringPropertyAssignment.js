function checkObjectLiteralDestructuringPropertyAssignment(node, objectLiteralType, propertyIndex, allProperties, rightIsThis = false) {
                const properties = node.properties;
                const property = properties[propertyIndex];
                if (property.kind === 299 /* PropertyAssignment */ || property.kind === 300 /* ShorthandPropertyAssignment */) {
                    const name = property.name;
                    const exprType = getLiteralTypeFromPropertyName(name);
                    if (isTypeUsableAsPropertyName(exprType)) {
                        const text = getPropertyNameFromType(exprType);
                        const prop = getPropertyOfType(objectLiteralType, text);
                        if (prop) {
                            markPropertyAsReferenced(prop, property, rightIsThis);
                            checkPropertyAccessibility(property, 
                            /*isSuper*/
                            false, 
                            /*writing*/
                            true, objectLiteralType, prop);
                        }
                    }
                    const elementType = getIndexedAccessType(objectLiteralType, exprType, 32 /* ExpressionPosition */, name);
                    const type = getFlowTypeOfDestructuring(property, elementType);
                    return checkDestructuringAssignment(property.kind === 300 /* ShorthandPropertyAssignment */ ? property : property.initializer, type);
                }
                else if (property.kind === 301 /* SpreadAssignment */) {
                    if (propertyIndex < properties.length - 1) {
                        error(property, Diagnostics.A_rest_element_must_be_last_in_a_destructuring_pattern);
                    }
                    else {
                        if (languageVersion < 99 /* ESNext */) {
                            checkExternalEmitHelpers(property, 4 /* Rest */);
                        }
                        const nonRestNames = [];
                        if (allProperties) {
                            for (const otherProperty of allProperties) {
                                if (!isSpreadAssignment(otherProperty)) {
                                    nonRestNames.push(otherProperty.name);
                                }
                            }
                        }
                        const type = getRestType(objectLiteralType, nonRestNames, objectLiteralType.symbol);
                        checkGrammarForDisallowedTrailingComma(allProperties, Diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma);
                        return checkDestructuringAssignment(property.expression, type);
                    }
                }
                else {
                    error(property, Diagnostics.Property_assignment_expected);
                }
            }