function can_substitute_directly() {
            if (has_default || has_destructured || var_assigned || fn.rest) return;
            if (compressor.option("inline") < 2 && fn.argnames.length) return;
            if (!fn.variables.all(function(def) {
                return def.references.length - def.replaced < 2 && def.orig[0] instanceof AST_SymbolFunarg;
            })) return;
            var scope = compressor.find_parent(AST_Scope);
            var abort = false;
            var avoid = avoid_await_yield(scope);
            var begin;
            var in_order = [];
            var side_effects = false;
            value.walk(new TreeWalker(function(node, descend) {
                if (abort) return true;
                if (node instanceof AST_Binary && lazy_op[node.operator]
                    || node instanceof AST_Conditional) {
                    in_order = null;
                    return;
                }
                if (node instanceof AST_Scope) return abort = true;
                if (avoid && node instanceof AST_Symbol && avoid[node.name]) return abort = true;
                if (node instanceof AST_SymbolRef) {
                    var def = node.definition();
                    if (fn.variables.get(node.name) !== def) {
                        in_order = null;
                        return;
                    }
                    if (def.init instanceof AST_LambdaDefinition) return abort = true;
                    if (is_lhs(node, this.parent())) return abort = true;
                    var index = resolve_index(def);
                    if (!(begin < index)) begin = index;
                    if (!in_order) return;
                    if (side_effects) {
                        in_order = null;
                    } else {
                        in_order.push(fn.argnames[index]);
                    }
                    return;
                }
                if (node.has_side_effects(compressor)) {
                    descend();
                    side_effects = true;
                    return true;
                }
            }));
            if (abort) return;
            var end = self.args.length;
            if (in_order && fn.argnames.length >= end) {
                end = fn.argnames.length;
                while (end-- > begin && fn.argnames[end] === in_order.pop());
                end++;
            }
            return end <= begin || all(self.args.slice(begin, end), side_effects && !in_order ? function(funarg) {
                return funarg.is_constant_expression(scope);
            } : function(funarg) {
                return !funarg.has_side_effects(compressor);
            });
        }