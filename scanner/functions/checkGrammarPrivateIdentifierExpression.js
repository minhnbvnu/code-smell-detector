function checkGrammarPrivateIdentifierExpression(privId) {
                if (!getContainingClass(privId)) {
                    return grammarErrorOnNode(privId, Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
                }
                if (!isForInStatement(privId.parent)) {
                    if (!isExpressionNode(privId)) {
                        return grammarErrorOnNode(privId, Diagnostics.Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member_declaration_property_access_or_on_the_left_hand_side_of_an_in_expression);
                    }
                    const isInOperation = isBinaryExpression(privId.parent) && privId.parent.operatorToken.kind === 101 /* InKeyword */;
                    if (!getSymbolForPrivateIdentifierExpression(privId) && !isInOperation) {
                        return grammarErrorOnNode(privId, Diagnostics.Cannot_find_name_0, idText(privId));
                    }
                }
                return false;
            }