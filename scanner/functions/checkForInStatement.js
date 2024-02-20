function checkForInStatement(node) {
                checkGrammarForInOrForOfStatement(node);
                const rightType = getNonNullableTypeIfNeeded(checkExpression(node.expression));
                if (node.initializer.kind === 258 /* VariableDeclarationList */) {
                    const variable = node.initializer.declarations[0];
                    if (variable && isBindingPattern(variable.name)) {
                        error(variable.name, Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern);
                    }
                    checkForInOrForOfVariableDeclaration(node);
                }
                else {
                    const varExpr = node.initializer;
                    const leftType = checkExpression(varExpr);
                    if (varExpr.kind === 206 /* ArrayLiteralExpression */ || varExpr.kind === 207 /* ObjectLiteralExpression */) {
                        error(varExpr, Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern);
                    }
                    else if (!isTypeAssignableTo(getIndexTypeOrString(rightType), leftType)) {
                        error(varExpr, Diagnostics.The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any);
                    }
                    else {
                        checkReferenceExpression(varExpr, Diagnostics.The_left_hand_side_of_a_for_in_statement_must_be_a_variable_or_a_property_access, Diagnostics.The_left_hand_side_of_a_for_in_statement_may_not_be_an_optional_property_access);
                    }
                }
                if (rightType === neverType || !isTypeAssignableToKind(rightType, 67108864 /* NonPrimitive */ | 58982400 /* InstantiableNonPrimitive */)) {
                    error(node.expression, Diagnostics.The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter_but_here_has_type_0, typeToString(rightType));
                }
                checkSourceElement(node.statement);
                if (node.locals) {
                    registerForUnusedIdentifiersCheck(node);
                }
            }