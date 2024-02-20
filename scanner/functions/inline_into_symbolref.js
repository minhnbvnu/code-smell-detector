function inline_into_symbolref(self, compressor) {
            const parent = compressor.parent();
            const def = self.definition();
            const nearest_scope = compressor.find_scope();
            if (compressor.top_retain && def.global && compressor.top_retain(def)) {
                def.fixed = false;
                def.single_use = false;
                return self;
            }
            let fixed = self.fixed_value();
            let single_use = def.single_use
                && !(parent instanceof AST_Call
                    && (parent.is_callee_pure(compressor))
                    || has_annotation(parent, _NOINLINE))
                && !(parent instanceof AST_Export
                    && fixed instanceof AST_Lambda
                    && fixed.name);
            if (single_use && fixed instanceof AST_Node) {
                single_use =
                    !fixed.has_side_effects(compressor)
                        && !fixed.may_throw(compressor);
            }
            if (single_use && (fixed instanceof AST_Lambda || fixed instanceof AST_Class)) {
                if (retain_top_func(fixed, compressor)) {
                    single_use = false;
                }
                else if (def.scope !== self.scope
                    && (def.escaped == 1
                        || has_flag(fixed, INLINED)
                        || within_array_or_object_literal(compressor)
                        || !compressor.option("reduce_funcs"))) {
                    single_use = false;
                }
                else if (is_recursive_ref(compressor, def)) {
                    single_use = false;
                }
                else if (def.scope !== self.scope || def.orig[0] instanceof AST_SymbolFunarg) {
                    single_use = fixed.is_constant_expression(self.scope);
                    if (single_use == "f") {
                        var scope = self.scope;
                        do {
                            if (scope instanceof AST_Defun || is_func_expr(scope)) {
                                set_flag(scope, INLINED);
                            }
                        } while (scope = scope.parent_scope);
                    }
                }
            }
            if (single_use && (fixed instanceof AST_Lambda || fixed instanceof AST_Class)) {
                single_use =
                    def.scope === self.scope
                        && !scope_encloses_variables_in_this_scope(nearest_scope, fixed)
                        || parent instanceof AST_Call
                            && parent.expression === self
                            && !scope_encloses_variables_in_this_scope(nearest_scope, fixed)
                            && !(fixed.name && fixed.name.definition().recursive_refs > 0);
            }
            if (single_use && fixed) {
                if (fixed instanceof AST_DefClass) {
                    set_flag(fixed, SQUEEZED);
                    fixed = make_node(AST_ClassExpression, fixed, fixed);
                }
                if (fixed instanceof AST_Defun) {
                    set_flag(fixed, SQUEEZED);
                    fixed = make_node(AST_Function, fixed, fixed);
                }
                if (def.recursive_refs > 0 && fixed.name instanceof AST_SymbolDefun) {
                    const defun_def = fixed.name.definition();
                    let lambda_def = fixed.variables.get(fixed.name.name);
                    let name = lambda_def && lambda_def.orig[0];
                    if (!(name instanceof AST_SymbolLambda)) {
                        name = make_node(AST_SymbolLambda, fixed.name, fixed.name);
                        name.scope = fixed;
                        fixed.name = name;
                        lambda_def = fixed.def_function(name);
                    }
                    walk(fixed, node => {
                        if (node instanceof AST_SymbolRef && node.definition() === defun_def) {
                            node.thedef = lambda_def;
                            lambda_def.references.push(node);
                        }
                    });
                }
                if ((fixed instanceof AST_Lambda || fixed instanceof AST_Class)
                    && fixed.parent_scope !== nearest_scope) {
                    fixed = fixed.clone(true, compressor.get_toplevel());
                    nearest_scope.add_child_scope(fixed);
                }
                return fixed.optimize(compressor);
            }
            // multiple uses
            if (fixed) {
                let replace;
                if (fixed instanceof AST_This) {
                    if (!(def.orig[0] instanceof AST_SymbolFunarg)
                        && def.references.every((ref) => def.scope === ref.scope)) {
                        replace = fixed;
                    }
                }
                else {
                    var ev = fixed.evaluate(compressor);
                    if (ev !== fixed
                        && (compressor.option("unsafe_regexp") || !(ev instanceof RegExp))) {
                        replace = make_node_from_constant(ev, fixed);
                    }
                }
                if (replace) {
                    const name_length = self.size(compressor);
                    const replace_size = replace.size(compressor);
                    let overhead = 0;
                    if (compressor.option("unused") && !compressor.exposed(def)) {
                        overhead =
                            (name_length + 2 + replace_size) /
                                (def.references.length - def.assignments);
                    }
                    if (replace_size <= name_length + overhead) {
                        return replace;
                    }
                }
            }
            return self;
        }