function checkGrammarMethod(node) {
                if (checkGrammarFunctionLikeDeclaration(node)) {
                    return true;
                }
                if (node.kind === 171 /* MethodDeclaration */) {
                    if (node.parent.kind === 207 /* ObjectLiteralExpression */) {
                        if (node.modifiers && !(node.modifiers.length === 1 && first(node.modifiers).kind === 132 /* AsyncKeyword */)) {
                            return grammarErrorOnFirstToken(node, Diagnostics.Modifiers_cannot_appear_here);
                        }
                        else if (checkGrammarForInvalidQuestionMark(node.questionToken, Diagnostics.An_object_member_cannot_be_declared_optional)) {
                            return true;
                        }
                        else if (checkGrammarForInvalidExclamationToken(node.exclamationToken, Diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context)) {
                            return true;
                        }
                        else if (node.body === void 0) {
                            return grammarErrorAtPos(node, node.end - 1, ";".length, Diagnostics._0_expected, "{");
                        }
                    }
                    if (checkGrammarForGenerator(node)) {
                        return true;
                    }
                }
                if (isClassLike(node.parent)) {
                    if (languageVersion < 2 /* ES2015 */ && isPrivateIdentifier(node.name)) {
                        return grammarErrorOnNode(node.name, Diagnostics.Private_identifiers_are_only_available_when_targeting_ECMAScript_2015_and_higher);
                    }
                    if (node.flags & 16777216 /* Ambient */) {
                        return checkGrammarForInvalidDynamicName(node.name, Diagnostics.A_computed_property_name_in_an_ambient_context_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type);
                    }
                    else if (node.kind === 171 /* MethodDeclaration */ && !node.body) {
                        return checkGrammarForInvalidDynamicName(node.name, Diagnostics.A_computed_property_name_in_a_method_overload_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type);
                    }
                }
                else if (node.parent.kind === 261 /* InterfaceDeclaration */) {
                    return checkGrammarForInvalidDynamicName(node.name, Diagnostics.A_computed_property_name_in_an_interface_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type);
                }
                else if (node.parent.kind === 184 /* TypeLiteral */) {
                    return checkGrammarForInvalidDynamicName(node.name, Diagnostics.A_computed_property_name_in_a_type_literal_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type);
                }
            }