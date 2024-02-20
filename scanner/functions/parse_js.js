function parse_js(flag) {
                return function (value, options) {
                    options = options || {};
                    try {
                        walk(parse(value, { expression: true }), node => {
                            if (node instanceof AST_Assign) {
                                var name = node.left.print_to_string();
                                var value = node.right;
                                if (flag) {
                                    options[name] = value;
                                }
                                else if (value instanceof AST_Array) {
                                    options[name] = value.elements.map(to_string);
                                }
                                else if (value instanceof AST_RegExp) {
                                    value = value.value;
                                    options[name] = new RegExp(value.source, value.flags);
                                }
                                else {
                                    options[name] = to_string(value);
                                }
                                return true;
                            }
                            if (node instanceof AST_Symbol || node instanceof AST_PropAccess) {
                                var name = node.print_to_string();
                                options[name] = true;
                                return true;
                            }
                            if (!(node instanceof AST_Sequence))
                                throw node;
                            function to_string(value) {
                                return value instanceof AST_Constant ? value.getValue() : value.print_to_string({
                                    quote_keys: true
                                });
                            }
                        });
                    }
                    catch (ex) {
                        if (flag) {
                            fatal("Error parsing arguments for '" + flag + "': " + value);
                        }
                        else {
                            options[value] = null;
                        }
                    }
                    return options;
                };
            }