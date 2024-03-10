function parsingContextErrors(context) {
                        switch (context) {
                            case 0 /* SourceElements */:
                                return token() === 88 /* DefaultKeyword */ ? parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(93 /* ExportKeyword */)) : parseErrorAtCurrentToken(Diagnostics.Declaration_or_statement_expected);
                            case 1 /* BlockStatements */:
                                return parseErrorAtCurrentToken(Diagnostics.Declaration_or_statement_expected);
                            case 2 /* SwitchClauses */:
                                return parseErrorAtCurrentToken(Diagnostics.case_or_default_expected);
                            case 3 /* SwitchClauseStatements */:
                                return parseErrorAtCurrentToken(Diagnostics.Statement_expected);
                            case 18 /* RestProperties */:
                            case 4 /* TypeMembers */:
                                return parseErrorAtCurrentToken(Diagnostics.Property_or_signature_expected);
                            case 5 /* ClassMembers */:
                                return parseErrorAtCurrentToken(Diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected);
                            case 6 /* EnumMembers */:
                                return parseErrorAtCurrentToken(Diagnostics.Enum_member_expected);
                            case 7 /* HeritageClauseElement */:
                                return parseErrorAtCurrentToken(Diagnostics.Expression_expected);
                            case 8 /* VariableDeclarations */:
                                return isKeyword(token()) ? parseErrorAtCurrentToken(Diagnostics._0_is_not_allowed_as_a_variable_declaration_name, tokenToString(token())) : parseErrorAtCurrentToken(Diagnostics.Variable_declaration_expected);
                            case 9 /* ObjectBindingElements */:
                                return parseErrorAtCurrentToken(Diagnostics.Property_destructuring_pattern_expected);
                            case 10 /* ArrayBindingElements */:
                                return parseErrorAtCurrentToken(Diagnostics.Array_element_destructuring_pattern_expected);
                            case 11 /* ArgumentExpressions */:
                                return parseErrorAtCurrentToken(Diagnostics.Argument_expression_expected);
                            case 12 /* ObjectLiteralMembers */:
                                return parseErrorAtCurrentToken(Diagnostics.Property_assignment_expected);
                            case 15 /* ArrayLiteralMembers */:
                                return parseErrorAtCurrentToken(Diagnostics.Expression_or_comma_expected);
                            case 17 /* JSDocParameters */:
                                return parseErrorAtCurrentToken(Diagnostics.Parameter_declaration_expected);
                            case 16 /* Parameters */:
                                return isKeyword(token()) ? parseErrorAtCurrentToken(Diagnostics._0_is_not_allowed_as_a_parameter_name, tokenToString(token())) : parseErrorAtCurrentToken(Diagnostics.Parameter_declaration_expected);
                            case 19 /* TypeParameters */:
                                return parseErrorAtCurrentToken(Diagnostics.Type_parameter_declaration_expected);
                            case 20 /* TypeArguments */:
                                return parseErrorAtCurrentToken(Diagnostics.Type_argument_expected);
                            case 21 /* TupleElementTypes */:
                                return parseErrorAtCurrentToken(Diagnostics.Type_expected);
                            case 22 /* HeritageClauses */:
                                return parseErrorAtCurrentToken(Diagnostics.Unexpected_token_expected);
                            case 23 /* ImportOrExportSpecifiers */:
                                return parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
                            case 13 /* JsxAttributes */:
                                return parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
                            case 14 /* JsxChildren */:
                                return parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
                            case 24 /* AssertEntries */:
                                return parseErrorAtCurrentToken(Diagnostics.Identifier_or_string_literal_expected);
                            case 25 /* Count */:
                                return Debug.fail("ParsingContext.Count used as a context");
                            default:
                                Debug.assertNever(context);
                        }
                    }