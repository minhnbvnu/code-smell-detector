function binding_element(used_parameters, symbol_type) {
                var elements = [];
                var first = true;
                var is_expand = false;
                var expand_token;
                var first_token = S.token;
                if (used_parameters === undefined) {
                    const strict = S.input.has_directive("use strict");
                    const duplicates_ok = symbol_type === AST_SymbolVar;
                    used_parameters = new UsedParametersTracker(false, strict, duplicates_ok);
                }
                symbol_type = symbol_type === undefined ? AST_SymbolFunarg : symbol_type;
                if (is("punc", "[")) {
                    next();
                    while (!is("punc", "]")) {
                        if (first) {
                            first = false;
                        }
                        else {
                            expect(",");
                        }
                        if (is("expand", "...")) {
                            is_expand = true;
                            expand_token = S.token;
                            used_parameters.mark_spread(S.token);
                            next();
                        }
                        if (is("punc")) {
                            switch (S.token.value) {
                                case ",":
                                    elements.push(new AST_Hole({
                                        start: S.token,
                                        end: S.token
                                    }));
                                    continue;
                                case "]": // Trailing comma after last element
                                    break;
                                case "[":
                                case "{":
                                    elements.push(binding_element(used_parameters, symbol_type));
                                    break;
                                default:
                                    unexpected();
                            }
                        }
                        else if (is("name")) {
                            used_parameters.add_parameter(S.token);
                            elements.push(as_symbol(symbol_type));
                        }
                        else {
                            croak("Invalid function parameter");
                        }
                        if (is("operator", "=") && is_expand === false) {
                            used_parameters.mark_default_assignment(S.token);
                            next();
                            elements[elements.length - 1] = new AST_DefaultAssign({
                                start: elements[elements.length - 1].start,
                                left: elements[elements.length - 1],
                                operator: "=",
                                right: expression(false),
                                end: S.token
                            });
                        }
                        if (is_expand) {
                            if (!is("punc", "]")) {
                                croak("Rest element must be last element");
                            }
                            elements[elements.length - 1] = new AST_Expansion({
                                start: expand_token,
                                expression: elements[elements.length - 1],
                                end: expand_token
                            });
                        }
                    }
                    expect("]");
                    used_parameters.check_strict();
                    return new AST_Destructuring({
                        start: first_token,
                        names: elements,
                        is_array: true,
                        end: prev()
                    });
                }
                else if (is("punc", "{")) {
                    next();
                    while (!is("punc", "}")) {
                        if (first) {
                            first = false;
                        }
                        else {
                            expect(",");
                        }
                        if (is("expand", "...")) {
                            is_expand = true;
                            expand_token = S.token;
                            used_parameters.mark_spread(S.token);
                            next();
                        }
                        if (is("name") && (is_token(peek(), "punc") || is_token(peek(), "operator")) && [",", "}", "="].includes(peek().value)) {
                            used_parameters.add_parameter(S.token);
                            var start = prev();
                            var value = as_symbol(symbol_type);
                            if (is_expand) {
                                elements.push(new AST_Expansion({
                                    start: expand_token,
                                    expression: value,
                                    end: value.end,
                                }));
                            }
                            else {
                                elements.push(new AST_ObjectKeyVal({
                                    start: start,
                                    key: value.name,
                                    value: value,
                                    end: value.end,
                                }));
                            }
                        }
                        else if (is("punc", "}")) {
                            continue; // Allow trailing hole
                        }
                        else {
                            var property_token = S.token;
                            var property = as_property_name();
                            if (property === null) {
                                unexpected(prev());
                            }
                            else if (prev().type === "name" && !is("punc", ":")) {
                                elements.push(new AST_ObjectKeyVal({
                                    start: prev(),
                                    key: property,
                                    value: new symbol_type({
                                        start: prev(),
                                        name: property,
                                        end: prev()
                                    }),
                                    end: prev()
                                }));
                            }
                            else {
                                expect(":");
                                elements.push(new AST_ObjectKeyVal({
                                    start: property_token,
                                    quote: property_token.quote,
                                    key: property,
                                    value: binding_element(used_parameters, symbol_type),
                                    end: prev()
                                }));
                            }
                        }
                        if (is_expand) {
                            if (!is("punc", "}")) {
                                croak("Rest element must be last element");
                            }
                        }
                        else if (is("operator", "=")) {
                            used_parameters.mark_default_assignment(S.token);
                            next();
                            elements[elements.length - 1].value = new AST_DefaultAssign({
                                start: elements[elements.length - 1].value.start,
                                left: elements[elements.length - 1].value,
                                operator: "=",
                                right: expression(false),
                                end: S.token
                            });
                        }
                    }
                    expect("}");
                    used_parameters.check_strict();
                    return new AST_Destructuring({
                        start: first_token,
                        names: elements,
                        is_array: false,
                        end: prev()
                    });
                }
                else if (is("name")) {
                    used_parameters.add_parameter(S.token);
                    return as_symbol(symbol_type);
                }
                else {
                    croak("Invalid function parameter");
                }
            }