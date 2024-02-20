function checkGrammarObjectLiteralExpression(node, inDestructuring) {
                const seen = /* @__PURE__ */ new Map();
                for (const prop of node.properties) {
                    if (prop.kind === 301 /* SpreadAssignment */) {
                        if (inDestructuring) {
                            const expression = skipParentheses(prop.expression);
                            if (isArrayLiteralExpression(expression) || isObjectLiteralExpression(expression)) {
                                return grammarErrorOnNode(prop.expression, Diagnostics.A_rest_element_cannot_contain_a_binding_pattern);
                            }
                        }
                        continue;
                    }
                    const name = prop.name;
                    if (name.kind === 164 /* ComputedPropertyName */) {
                        checkGrammarComputedPropertyName(name);
                    }
                    if (prop.kind === 300 /* ShorthandPropertyAssignment */ && !inDestructuring && prop.objectAssignmentInitializer) {
                        grammarErrorOnNode(prop.equalsToken, Diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern);
                    }
                    if (name.kind === 80 /* PrivateIdentifier */) {
                        grammarErrorOnNode(name, Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
                    }
                    if (canHaveModifiers(prop) && prop.modifiers) {
                        for (const mod of prop.modifiers) {
                            if (isModifier(mod) && (mod.kind !== 132 /* AsyncKeyword */ || prop.kind !== 171 /* MethodDeclaration */)) {
                                grammarErrorOnNode(mod, Diagnostics._0_modifier_cannot_be_used_here, getTextOfNode(mod));
                            }
                        }
                    }
                    else if (canHaveIllegalModifiers(prop) && prop.modifiers) {
                        for (const mod of prop.modifiers) {
                            if (isModifier(mod)) {
                                grammarErrorOnNode(mod, Diagnostics._0_modifier_cannot_be_used_here, getTextOfNode(mod));
                            }
                        }
                    }
                    let currentKind;
                    switch (prop.kind) {
                        case 300 /* ShorthandPropertyAssignment */:
                        case 299 /* PropertyAssignment */:
                            checkGrammarForInvalidExclamationToken(prop.exclamationToken, Diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context);
                            checkGrammarForInvalidQuestionMark(prop.questionToken, Diagnostics.An_object_member_cannot_be_declared_optional);
                            if (name.kind === 8 /* NumericLiteral */) {
                                checkGrammarNumericLiteral(name);
                            }
                            currentKind = 4 /* PropertyAssignment */;
                            break;
                        case 171 /* MethodDeclaration */:
                            currentKind = 8 /* Method */;
                            break;
                        case 174 /* GetAccessor */:
                            currentKind = 1 /* GetAccessor */;
                            break;
                        case 175 /* SetAccessor */:
                            currentKind = 2 /* SetAccessor */;
                            break;
                        default:
                            throw Debug.assertNever(prop, "Unexpected syntax kind:" + prop.kind);
                    }
                    if (!inDestructuring) {
                        const effectiveName = getPropertyNameForPropertyNameNode(name);
                        if (effectiveName === void 0) {
                            continue;
                        }
                        const existingKind = seen.get(effectiveName);
                        if (!existingKind) {
                            seen.set(effectiveName, currentKind);
                        }
                        else {
                            if (currentKind & 8 /* Method */ && existingKind & 8 /* Method */) {
                                grammarErrorOnNode(name, Diagnostics.Duplicate_identifier_0, getTextOfNode(name));
                            }
                            else if (currentKind & 4 /* PropertyAssignment */ && existingKind & 4 /* PropertyAssignment */) {
                                grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_multiple_properties_with_the_same_name, getTextOfNode(name));
                            }
                            else if (currentKind & 3 /* GetOrSetAccessor */ && existingKind & 3 /* GetOrSetAccessor */) {
                                if (existingKind !== 3 /* GetOrSetAccessor */ && currentKind !== existingKind) {
                                    seen.set(effectiveName, currentKind | existingKind);
                                }
                                else {
                                    return grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name);
                                }
                            }
                            else {
                                return grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_property_and_accessor_with_the_same_name);
                            }
                        }
                    }
                }
            }