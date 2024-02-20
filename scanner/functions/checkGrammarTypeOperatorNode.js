function checkGrammarTypeOperatorNode(node) {
                if (node.operator === 156 /* UniqueKeyword */) {
                    if (node.type.kind !== 153 /* SymbolKeyword */) {
                        return grammarErrorOnNode(node.type, Diagnostics._0_expected, tokenToString(153 /* SymbolKeyword */));
                    }
                    let parent2 = walkUpParenthesizedTypes(node.parent);
                    if (isInJSFile(parent2) && isJSDocTypeExpression(parent2)) {
                        const host2 = getJSDocHost(parent2);
                        if (host2) {
                            parent2 = getSingleVariableOfVariableStatement(host2) || host2;
                        }
                    }
                    switch (parent2.kind) {
                        case 257 /* VariableDeclaration */:
                            const decl = parent2;
                            if (decl.name.kind !== 79 /* Identifier */) {
                                return grammarErrorOnNode(node, Diagnostics.unique_symbol_types_may_not_be_used_on_a_variable_declaration_with_a_binding_name);
                            }
                            if (!isVariableDeclarationInVariableStatement(decl)) {
                                return grammarErrorOnNode(node, Diagnostics.unique_symbol_types_are_only_allowed_on_variables_in_a_variable_statement);
                            }
                            if (!(decl.parent.flags & 2 /* Const */)) {
                                return grammarErrorOnNode(parent2.name, Diagnostics.A_variable_whose_type_is_a_unique_symbol_type_must_be_const);
                            }
                            break;
                        case 169 /* PropertyDeclaration */:
                            if (!isStatic(parent2) || !hasEffectiveReadonlyModifier(parent2)) {
                                return grammarErrorOnNode(parent2.name, Diagnostics.A_property_of_a_class_whose_type_is_a_unique_symbol_type_must_be_both_static_and_readonly);
                            }
                            break;
                        case 168 /* PropertySignature */:
                            if (!hasSyntacticModifier(parent2, 64 /* Readonly */)) {
                                return grammarErrorOnNode(parent2.name, Diagnostics.A_property_of_an_interface_or_type_literal_whose_type_is_a_unique_symbol_type_must_be_readonly);
                            }
                            break;
                        default:
                            return grammarErrorOnNode(node, Diagnostics.unique_symbol_types_are_not_allowed_here);
                    }
                }
                else if (node.operator === 146 /* ReadonlyKeyword */) {
                    if (node.type.kind !== 185 /* ArrayType */ && node.type.kind !== 186 /* TupleType */) {
                        return grammarErrorOnFirstToken(node, Diagnostics.readonly_type_modifier_is_only_permitted_on_array_and_tuple_literal_types, tokenToString(153 /* SymbolKeyword */));
                    }
                }
            }