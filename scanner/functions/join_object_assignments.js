function join_object_assignments(defn, body) {
                if (!(defn instanceof AST_Definitions))
                    return;
                var def = defn.definitions[defn.definitions.length - 1];
                if (!(def.value instanceof AST_Object))
                    return;
                var exprs;
                if (body instanceof AST_Assign && !body.logical) {
                    exprs = [body];
                }
                else if (body instanceof AST_Sequence) {
                    exprs = body.expressions.slice();
                }
                if (!exprs)
                    return;
                var trimmed = false;
                do {
                    var node = exprs[0];
                    if (!(node instanceof AST_Assign))
                        break;
                    if (node.operator != "=")
                        break;
                    if (!(node.left instanceof AST_PropAccess))
                        break;
                    var sym = node.left.expression;
                    if (!(sym instanceof AST_SymbolRef))
                        break;
                    if (def.name.name != sym.name)
                        break;
                    if (!node.right.is_constant_expression(nearest_scope))
                        break;
                    var prop = node.left.property;
                    if (prop instanceof AST_Node) {
                        prop = prop.evaluate(compressor);
                    }
                    if (prop instanceof AST_Node)
                        break;
                    prop = "" + prop;
                    var diff = compressor.option("ecma") < 2015
                        && compressor.has_directive("use strict") ? function (node) {
                        return node.key != prop && (node.key && node.key.name != prop);
                    } : function (node) {
                        return node.key && node.key.name != prop;
                    };
                    if (!def.value.properties.every(diff))
                        break;
                    var p = def.value.properties.filter(function (p) { return p.key === prop; })[0];
                    if (!p) {
                        def.value.properties.push(make_node(AST_ObjectKeyVal, node, {
                            key: prop,
                            value: node.right
                        }));
                    }
                    else {
                        p.value = new AST_Sequence({
                            start: p.start,
                            expressions: [p.value.clone(), node.right.clone()],
                            end: p.end
                        });
                    }
                    exprs.shift();
                    trimmed = true;
                } while (exprs.length);
                return trimmed && exprs;
            }