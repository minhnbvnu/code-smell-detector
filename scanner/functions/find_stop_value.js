function find_stop_value(node, level) {
                var parent = scanner.parent(level);
                if (parent instanceof AST_Array) return find_stop_value(parent, level + 1);
                if (parent instanceof AST_Assign) {
                    if (may_throw(parent)) return node;
                    if (parent.left.match_symbol(function(ref) {
                        return ref instanceof AST_SymbolRef && (lhs.name == ref.name || value_def.name == ref.name);
                    })) return node;
                    var op;
                    if (parent.left === node || !lazy_op[op = parent.operator.slice(0, -1)]) {
                        return find_stop_value(parent, level + 1);
                    }
                    return find_stop_logical(parent, op, level);
                }
                if (parent instanceof AST_Binary) {
                    var op;
                    if (parent.left === node || !lazy_op[op = parent.operator]) {
                        return find_stop_value(parent, level + 1);
                    }
                    return find_stop_logical(parent, op, level);
                }
                if (parent instanceof AST_Call) return parent;
                if (parent instanceof AST_Case) {
                    if (parent.expression !== node) return node;
                    return find_stop_value(parent, level + 1);
                }
                if (parent instanceof AST_Conditional) {
                    if (parent.condition !== node) return node;
                    return find_stop_value(parent, level + 1);
                }
                if (parent instanceof AST_Definitions) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_Do) return node;
                if (parent instanceof AST_Exit) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_For) {
                    if (parent.init !== node && parent.condition !== node) return node;
                    return find_stop_value(parent, level + 1);
                }
                if (parent instanceof AST_ForEnumeration) {
                    if (parent.init !== node) return node;
                    return find_stop_value(parent, level + 1);
                }
                if (parent instanceof AST_If) {
                    if (parent.condition !== node) return node;
                    return find_stop_value(parent, level + 1);
                }
                if (parent instanceof AST_ObjectProperty) {
                    var obj = scanner.parent(level + 1);
                    return all(obj.properties, function(prop) {
                        return prop instanceof AST_ObjectKeyVal;
                    }) ? find_stop_value(obj, level + 2) : obj;
                }
                if (parent instanceof AST_PropAccess) {
                    var exp = parent.expression;
                    return exp === node ? find_stop_value(parent, level + 1) : node;
                }
                if (parent instanceof AST_Sequence) {
                    return (parent.tail_node() === node ? find_stop_value : find_stop_unused)(parent, level + 1);
                }
                if (parent instanceof AST_SimpleStatement) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_Spread) return find_stop_value(parent, level + 1);
                if (parent instanceof AST_Switch) {
                    if (parent.expression !== node) return node;
                    return find_stop_value(parent, level + 1);
                }
                if (parent instanceof AST_Unary) {
                    if (parent.operator == "delete") return node;
                    return find_stop_value(parent, level + 1);
                }
                if (parent instanceof AST_VarDef) return parent.name.match_symbol(function(sym) {
                    return sym instanceof AST_SymbolDeclaration && (lhs.name == sym.name || value_def.name == sym.name);
                }) ? node : find_stop_value(parent, level + 1);
                if (parent instanceof AST_While) {
                    if (parent.condition !== node) return node;
                    return find_stop_value(parent, level + 1);
                }
                if (parent instanceof AST_Yield) return find_stop_value(parent, level + 1);
                return null;
            }