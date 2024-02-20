function scan_declaration(tw, compressor, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DefaultValue) {
                    reset_flags(node);
                    push(tw);
                    node.value.walk(tw);
                    pop(tw);
                    var save = fixed;
                    if (save) fixed = function() {
                        var value = save();
                        var ev;
                        if (is_undefined(value, compressor)
                            || (ev = fuzzy_eval(compressor, value, true)) === undefined) {
                            return make_sequence(node, [ value, node.value ]);
                        }
                        return ev instanceof AST_Node ? node : value;
                    };
                    node.name.walk(scanner);
                    fixed = save;
                    return true;
                }
                if (node instanceof AST_DestructuredArray) {
                    reset_flags(node);
                    var save = fixed;
                    node.elements.forEach(function(node, index) {
                        if (node instanceof AST_Hole) return reset_flags(node);
                        if (save) fixed = function() {
                            return make_node(AST_Sub, node, {
                                expression: save(),
                                property: make_node(AST_Number, node, { value: index }),
                            });
                        };
                        node.walk(scanner);
                    });
                    if (node.rest) {
                        var fixed_node;
                        if (save) fixed = compressor.option("rests") && function() {
                            var value = save();
                            if (!(value instanceof AST_Array)) return node;
                            if (!fixed_node) fixed_node = make_node(AST_Array, node);
                            fixed_node.elements = value.elements.slice(node.elements.length);
                            return fixed_node;
                        };
                        node.rest.walk(scanner);
                    }
                    fixed = save;
                    return true;
                }
                if (node instanceof AST_DestructuredObject) {
                    reset_flags(node);
                    var save = fixed;
                    node.properties.forEach(function(node) {
                        reset_flags(node);
                        if (node.key instanceof AST_Node) {
                            push(tw);
                            node.key.walk(tw);
                            pop(tw);
                        }
                        if (save) fixed = function() {
                            var key = node.key;
                            var type = AST_Sub;
                            if (typeof key == "string") {
                                if (is_identifier_string(key)) {
                                    type = AST_Dot;
                                } else {
                                    key = make_node_from_constant(key, node);
                                }
                            }
                            return make_node(type, node, {
                                expression: save(),
                                property: key
                            });
                        };
                        node.value.walk(scanner);
                    });
                    if (node.rest) {
                        fixed = false;
                        node.rest.walk(scanner);
                    }
                    fixed = save;
                    return true;
                }
                visit(node, fixed, function() {
                    var save_len = tw.stack.length;
                    for (var i = 0, len = scanner.stack.length - 1; i < len; i++) {
                        tw.stack.push(scanner.stack[i]);
                    }
                    node.walk(tw);
                    tw.stack.length = save_len;
                });
                return true;
            });
            lhs.walk(scanner);
        }