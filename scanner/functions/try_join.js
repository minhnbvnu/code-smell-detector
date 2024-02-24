function try_join(node) {
                if (!(node instanceof AST_Assign)) return;
                if (node.operator != "=") return;
                if (!(node.left instanceof AST_PropAccess)) return;
                var sym = node.left.expression;
                if (!(sym instanceof AST_SymbolRef)) return;
                if (!(sym.name in names)) return;
                if (!node.right.is_constant_expression(scope)) return;
                var prop = node.left.property;
                if (prop instanceof AST_Node) {
                    if (try_join(prop)) prop = node.left.property = prop.right.clone();
                    prop = prop.evaluate(compressor);
                }
                if (prop instanceof AST_Node) return;
                prop = "" + prop;
                var diff = prop == "__proto__" || compressor.has_directive("use strict") ? function(node) {
                    var key = node.key;
                    return typeof key == "string" && key != prop && key != "__proto__";
                } : function(node) {
                    var key = node.key;
                    if (node instanceof AST_ObjectGetter || node instanceof AST_ObjectSetter) {
                        return typeof key == "string" && key != prop;
                    }
                    return key !== "__proto__";
                };
                if (!all(value.properties, diff)) return;
                value.properties.push(make_node(AST_ObjectKeyVal, node, {
                    key: prop,
                    value: node.right,
                }));
                return true;
            }