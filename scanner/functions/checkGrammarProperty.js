function checkGrammarProperty(node) {
                if (isComputedPropertyName(node.name) && isBinaryExpression(node.name.expression) && node.name.expression.operatorToken.kind === 101 /* InKeyword */) {
                    return grammarErrorOnNode(node.parent.members[0], Diagnostics.A_mapped_type_may_not_declare_properties_or_methods);
                }
                if (isClassLike(node.parent)) {
                    if (isStringLiteral(node.name) && node.name.text === "constructor") {
                        return grammarErrorOnNode(node.name, Diagnostics.Classes_may_not_have_a_field_named_constructor);
                    }
                    if (checkGrammarForInvalidDynamicName(node.name, Diagnostics.A_computed_property_name_in_a_class_property_declaration_must_have_a_simple_literal_type_or_a_unique_symbol_type)) {
                        return true;
                    }
                    if (languageVersion < 2 /* ES2015 */ && isPrivateIdentifier(node.name)) {
                        return grammarErrorOnNode(node.name, Diagnostics.Private_identifiers_are_only_available_when_targeting_ECMAScript_2015_and_higher);
                    }
                    if (languageVersion < 2 /* ES2015 */ && isAutoAccessorPropertyDeclaration(node)) {
                        return grammarErrorOnNode(node.name, Diagnostics.Properties_with_the_accessor_modifier_are_only_available_when_targeting_ECMAScript_2015_and_higher);
                    }
                    if (isAutoAccessorPropertyDeclaration(node) && checkGrammarForInvalidQuestionMark(node.questionToken, Diagnostics.An_accessor_property_cannot_be_declared_optional)) {
                        return true;
                    }
                }
                else if (node.parent.kind === 261 /* InterfaceDeclaration */) {
                    if (checkGrammarForInvalidDynamicName(node.name, Diagnostics.A_computed_property_name_in_an_interface_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type)) {
                        return true;
                    }
                    Debug.assertNode(node, isPropertySignature);
                    if (node.initializer) {
                        return grammarErrorOnNode(node.initializer, Diagnostics.An_interface_property_cannot_have_an_initializer);
                    }
                }
                else if (isTypeLiteralNode(node.parent)) {
                    if (checkGrammarForInvalidDynamicName(node.name, Diagnostics.A_computed_property_name_in_a_type_literal_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type)) {
                        return true;
                    }
                    Debug.assertNode(node, isPropertySignature);
                    if (node.initializer) {
                        return grammarErrorOnNode(node.initializer, Diagnostics.A_type_literal_property_cannot_have_an_initializer);
                    }
                }
                if (node.flags & 16777216 /* Ambient */) {
                    checkAmbientInitializer(node);
                }
                if (isPropertyDeclaration(node) && node.exclamationToken && (!isClassLike(node.parent) || !node.type || node.initializer || node.flags & 16777216 /* Ambient */ || isStatic(node) || hasAbstractModifier(node))) {
                    const message = node.initializer ? Diagnostics.Declarations_with_initializers_cannot_also_have_definite_assignment_assertions : !node.type ? Diagnostics.Declarations_with_definite_assignment_assertions_must_also_have_type_annotations : Diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context;
                    return grammarErrorOnNode(node.exclamationToken, message);
                }
            }