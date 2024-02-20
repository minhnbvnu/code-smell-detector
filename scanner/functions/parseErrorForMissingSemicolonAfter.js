function parseErrorForMissingSemicolonAfter(node) {
                        var _a2;
                        if (isTaggedTemplateExpression(node)) {
                            parseErrorAt(skipTrivia(sourceText, node.template.pos), node.template.end, Diagnostics.Module_declaration_names_may_only_use_or_quoted_strings);
                            return;
                        }
                        const expressionText = isIdentifier(node) ? idText(node) : void 0;
                        if (!expressionText || !isIdentifierText(expressionText, languageVersion)) {
                            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(26 /* SemicolonToken */));
                            return;
                        }
                        const pos = skipTrivia(sourceText, node.pos);
                        switch (expressionText) {
                            case "const":
                            case "let":
                            case "var":
                                parseErrorAt(pos, node.end, Diagnostics.Variable_declaration_not_allowed_at_this_location);
                                return;
                            case "declare":
                                return;
                            case "interface":
                                parseErrorForInvalidName(Diagnostics.Interface_name_cannot_be_0, Diagnostics.Interface_must_be_given_a_name, 18 /* OpenBraceToken */);
                                return;
                            case "is":
                                parseErrorAt(pos, scanner2.getTextPos(), Diagnostics.A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods);
                                return;
                            case "module":
                            case "namespace":
                                parseErrorForInvalidName(Diagnostics.Namespace_name_cannot_be_0, Diagnostics.Namespace_must_be_given_a_name, 18 /* OpenBraceToken */);
                                return;
                            case "type":
                                parseErrorForInvalidName(Diagnostics.Type_alias_name_cannot_be_0, Diagnostics.Type_alias_must_be_given_a_name, 63 /* EqualsToken */);
                                return;
                        }
                        const suggestion = (_a2 = getSpellingSuggestion(expressionText, viableKeywordSuggestions, (n) => n)) != null ? _a2 : getSpaceSuggestion(expressionText);
                        if (suggestion) {
                            parseErrorAt(pos, node.end, Diagnostics.Unknown_keyword_or_identifier_Did_you_mean_0, suggestion);
                            return;
                        }
                        if (token() === 0 /* Unknown */) {
                            return;
                        }
                        parseErrorAt(pos, node.end, Diagnostics.Unexpected_keyword_or_identifier);
                    }