function checkInExpression(left, right, leftType, rightType) {
                if (leftType === silentNeverType || rightType === silentNeverType) {
                    return silentNeverType;
                }
                if (isPrivateIdentifier(left)) {
                    if (languageVersion < 99 /* ESNext */) {
                        checkExternalEmitHelpers(left, 2097152 /* ClassPrivateFieldIn */);
                    }
                    if (!getNodeLinks(left).resolvedSymbol && getContainingClass(left)) {
                        const isUncheckedJS = isUncheckedJSSuggestion(left, rightType.symbol, 
                        /*excludeClasses*/
                        true);
                        reportNonexistentProperty(left, rightType, isUncheckedJS);
                    }
                }
                else {
                    checkTypeAssignableTo(checkNonNullType(leftType, left), stringNumberSymbolType, left);
                }
                if (checkTypeAssignableTo(checkNonNullType(rightType, right), nonPrimitiveType, right)) {
                    if (hasEmptyObjectIntersection(rightType)) {
                        error(right, Diagnostics.Type_0_may_represent_a_primitive_value_which_is_not_permitted_as_the_right_operand_of_the_in_operator, typeToString(rightType));
                    }
                }
                return booleanType;
            }