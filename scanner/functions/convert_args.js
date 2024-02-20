function convert_args(value) {
            var args = self.args.slice();
            var destructured = has_default > 1 || has_destructured || fn.rest;
            if (destructured || has_spread) args = [ make_node(AST_Array, self, { elements: args }) ];
            if (destructured) {
                var tt = new TreeTransformer(function(node, descend) {
                    if (node instanceof AST_DefaultValue) return make_node(AST_DefaultValue, node, {
                        name: node.name.transform(tt) || make_void_lhs(node),
                        value: node.value,
                    });
                    if (node instanceof AST_DestructuredArray) {
                        var elements = [];
                        node.elements.forEach(function(node, index) {
                            node = node.transform(tt);
                            if (node) elements[index] = node;
                        });
                        fill_holes(node, elements);
                        return make_node(AST_DestructuredArray, node, { elements: elements });
                    }
                    if (node instanceof AST_DestructuredObject) {
                        var properties = [], side_effects = [];
                        node.properties.forEach(function(prop) {
                            var key = prop.key;
                            var value = prop.value.transform(tt);
                            if (value) {
                                if (side_effects.length) {
                                    if (!(key instanceof AST_Node)) key = make_node_from_constant(key, prop);
                                    side_effects.push(key);
                                    key = make_sequence(node, side_effects);
                                    side_effects = [];
                                }
                                properties.push(make_node(AST_DestructuredKeyVal, prop, {
                                    key: key,
                                    value: value,
                                }));
                            } else if (key instanceof AST_Node) {
                                side_effects.push(key);
                            }
                        });
                        if (side_effects.length) properties.push(make_node(AST_DestructuredKeyVal, node, {
                            key: make_sequence(node, side_effects),
                            value: make_void_lhs(node),
                        }));
                        return make_node(AST_DestructuredObject, node, { properties: properties });
                    }
                    if (node instanceof AST_SymbolFunarg) return null;
                });
                var lhs = [];
                fn.argnames.forEach(function(argname, index) {
                    argname = argname.transform(tt);
                    if (argname) lhs[index] = argname;
                });
                var rest = fn.rest && fn.rest.transform(tt);
                if (rest) lhs.length = fn.argnames.length;
                fill_holes(fn, lhs);
                args[0] = make_node(AST_Assign, self, {
                    operator: "=",
                    left: make_node(AST_DestructuredArray, fn, {
                        elements: lhs,
                        rest: rest,
                    }),
                    right: args[0],
                });
            } else fn.argnames.forEach(function(argname) {
                if (argname instanceof AST_DefaultValue) args.push(argname.value);
            });
            args.push(value || make_node(AST_Undefined, self));
            return args;
        }