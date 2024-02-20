function parseSemicolonAfterPropertyName(name, type, initializer) {
                        if (token() === 59 /* AtToken */ && !scanner2.hasPrecedingLineBreak()) {
                            parseErrorAtCurrentToken(Diagnostics.Decorators_must_precede_the_name_and_all_keywords_of_property_declarations);
                            return;
                        }
                        if (token() === 20 /* OpenParenToken */) {
                            parseErrorAtCurrentToken(Diagnostics.Cannot_start_a_function_call_in_a_type_annotation);
                            nextToken();
                            return;
                        }
                        if (type && !canParseSemicolon()) {
                            if (initializer) {
                                parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(26 /* SemicolonToken */));
                            }
                            else {
                                parseErrorAtCurrentToken(Diagnostics.Expected_for_property_initializer);
                            }
                            return;
                        }
                        if (tryParseSemicolon()) {
                            return;
                        }
                        if (initializer) {
                            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(26 /* SemicolonToken */));
                            return;
                        }
                        parseErrorForMissingSemicolonAfter(name);
                    }