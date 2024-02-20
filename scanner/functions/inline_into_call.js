function inline_into_call(self, fn, compressor) {
            var exp = self.expression;
            var simple_args = self.args.every((arg) => !(arg instanceof AST_Expansion));
            if (compressor.option("reduce_vars")
                && fn instanceof AST_SymbolRef
                && !has_annotation(self, _NOINLINE)) {
                const fixed = fn.fixed_value();
                if (!retain_top_func(fixed, compressor)) {
                    fn = fixed;
                }
            }
            var is_func = fn instanceof AST_Lambda;
            var stat = is_func && fn.body[0];
            var is_regular_func = is_func && !fn.is_generator && !fn.async;
            var can_inline = is_regular_func && compressor.option("inline") && !self.is_callee_pure(compressor);
            if (can_inline && stat instanceof AST_Return) {
                let returned = stat.value;
                if (!returned || returned.is_constant_expression()) {
                    if (returned) {
                        returned = returned.clone(true);
                    }
                    else {
                        returned = make_node(AST_Undefined, self);
                    }
                    const args = self.args.concat(returned);
                    return make_sequence(self, args).optimize(compressor);
                }
                // optimize identity function
                if (fn.argnames.length === 1
                    && (fn.argnames[0] instanceof AST_SymbolFunarg)
                    && self.args.length < 2
                    && !(self.args[0] instanceof AST_Expansion)
                    && returned instanceof AST_SymbolRef
                    && returned.name === fn.argnames[0].name) {
                    const replacement = (self.args[0] || make_node(AST_Undefined)).optimize(compressor);
                    let parent;
                    if (replacement instanceof AST_PropAccess
                        && (parent = compressor.parent()) instanceof AST_Call
                        && parent.expression === self) {
                        // identity function was being used to remove `this`, like in
                        //
                        // id(bag.no_this)(...)
                        //
                        // Replace with a larger but more effish (0, bag.no_this) wrapper.
                        return make_sequence(self, [
                            make_node(AST_Number, self, { value: 0 }),
                            replacement
                        ]);
                    }
                    // replace call with first argument or undefined if none passed
                    return replacement;
                }
            }
            if (can_inline) {
                var scope, in_loop, level = -1;
                let def;
                let returned_value;
                let nearest_scope;
                if (simple_args
                    && !fn.uses_arguments
                    && !(compressor.parent() instanceof AST_Class)
                    && !(fn.name && fn instanceof AST_Function)
                    && (returned_value = can_flatten_body(stat))
                    && (exp === fn
                        || has_annotation(self, _INLINE)
                        || compressor.option("unused")
                            && (def = exp.definition()).references.length == 1
                            && !is_recursive_ref(compressor, def)
                            && fn.is_constant_expression(exp.scope))
                    && !has_annotation(self, _PURE | _NOINLINE)
                    && !fn.contains_this()
                    && can_inject_symbols()
                    && (nearest_scope = compressor.find_scope())
                    && !scope_encloses_variables_in_this_scope(nearest_scope, fn)
                    && !(function in_default_assign() {
                        // Due to the fact function parameters have their own scope
                        // which can't use `var something` in the function body within,
                        // we simply don't inline into DefaultAssign.
                        let i = 0;
                        let p;
                        while ((p = compressor.parent(i++))) {
                            if (p instanceof AST_DefaultAssign)
                                return true;
                            if (p instanceof AST_Block)
                                break;
                        }
                        return false;
                    })()
                    && !(scope instanceof AST_Class)) {
                    set_flag(fn, SQUEEZED);
                    nearest_scope.add_child_scope(fn);
                    return make_sequence(self, flatten_fn(returned_value)).optimize(compressor);
                }
            }
            if (can_inline && has_annotation(self, _INLINE)) {
                set_flag(fn, SQUEEZED);
                fn = make_node(fn.CTOR === AST_Defun ? AST_Function : fn.CTOR, fn, fn);
                fn = fn.clone(true);
                fn.figure_out_scope({}, {
                    parent_scope: compressor.find_scope(),
                    toplevel: compressor.get_toplevel()
                });
                return make_node(AST_Call, self, {
                    expression: fn,
                    args: self.args,
                }).optimize(compressor);
            }
            const can_drop_this_call = is_regular_func && compressor.option("side_effects") && fn.body.every(is_empty);
            if (can_drop_this_call) {
                var args = self.args.concat(make_node(AST_Undefined, self));
                return make_sequence(self, args).optimize(compressor);
            }
            if (compressor.option("negate_iife")
                && compressor.parent() instanceof AST_SimpleStatement
                && is_iife_call(self)) {
                return self.negate(compressor, true);
            }
            var ev = self.evaluate(compressor);
            if (ev !== self) {
                ev = make_node_from_constant(ev, self).optimize(compressor);
                return best_of(compressor, ev, self);
            }
            return self;
            function return_value(stat) {
                if (!stat)
                    return make_node(AST_Undefined, self);
                if (stat instanceof AST_Return) {
                    if (!stat.value)
                        return make_node(AST_Undefined, self);
                    return stat.value.clone(true);
                }
                if (stat instanceof AST_SimpleStatement) {
                    return make_node(AST_UnaryPrefix, stat, {
                        operator: "void",
                        expression: stat.body.clone(true)
                    });
                }
            }
            function can_flatten_body(stat) {
                var body = fn.body;
                var len = body.length;
                if (compressor.option("inline") < 3) {
                    return len == 1 && return_value(stat);
                }
                stat = null;
                for (var i = 0; i < len; i++) {
                    var line = body[i];
                    if (line instanceof AST_Var) {
                        if (stat && !line.definitions.every((var_def) => !var_def.value)) {
                            return false;
                        }
                    }
                    else if (stat) {
                        return false;
                    }
                    else if (!(line instanceof AST_EmptyStatement)) {
                        stat = line;
                    }
                }
                return return_value(stat);
            }
            function can_inject_args(block_scoped, safe_to_inject) {
                for (var i = 0, len = fn.argnames.length; i < len; i++) {
                    var arg = fn.argnames[i];
                    if (arg instanceof AST_DefaultAssign) {
                        if (has_flag(arg.left, UNUSED))
                            continue;
                        return false;
                    }
                    if (arg instanceof AST_Destructuring)
                        return false;
                    if (arg instanceof AST_Expansion) {
                        if (has_flag(arg.expression, UNUSED))
                            continue;
                        return false;
                    }
                    if (has_flag(arg, UNUSED))
                        continue;
                    if (!safe_to_inject
                        || block_scoped.has(arg.name)
                        || identifier_atom.has(arg.name)
                        || scope.conflicting_def(arg.name)) {
                        return false;
                    }
                    if (in_loop)
                        in_loop.push(arg.definition());
                }
                return true;
            }
            function can_inject_vars(block_scoped, safe_to_inject) {
                var len = fn.body.length;
                for (var i = 0; i < len; i++) {
                    var stat = fn.body[i];
                    if (!(stat instanceof AST_Var))
                        continue;
                    if (!safe_to_inject)
                        return false;
                    for (var j = stat.definitions.length; --j >= 0;) {
                        var name = stat.definitions[j].name;
                        if (name instanceof AST_Destructuring
                            || block_scoped.has(name.name)
                            || identifier_atom.has(name.name)
                            || scope.conflicting_def(name.name)) {
                            return false;
                        }
                        if (in_loop)
                            in_loop.push(name.definition());
                    }
                }
                return true;
            }
            function can_inject_symbols() {
                var block_scoped = new Set();
                do {
                    scope = compressor.parent(++level);
                    if (scope.is_block_scope() && scope.block_scope) {
                        // TODO this is sometimes undefined during compression.
                        // But it should always have a value!
                        scope.block_scope.variables.forEach(function (variable) {
                            block_scoped.add(variable.name);
                        });
                    }
                    if (scope instanceof AST_Catch) {
                        // TODO can we delete? AST_Catch is a block scope.
                        if (scope.argname) {
                            block_scoped.add(scope.argname.name);
                        }
                    }
                    else if (scope instanceof AST_IterationStatement) {
                        in_loop = [];
                    }
                    else if (scope instanceof AST_SymbolRef) {
                        if (scope.fixed_value() instanceof AST_Scope)
                            return false;
                    }
                } while (!(scope instanceof AST_Scope));
                var safe_to_inject = !(scope instanceof AST_Toplevel) || compressor.toplevel.vars;
                var inline = compressor.option("inline");
                if (!can_inject_vars(block_scoped, inline >= 3 && safe_to_inject))
                    return false;
                if (!can_inject_args(block_scoped, inline >= 2 && safe_to_inject))
                    return false;
                return !in_loop || in_loop.length == 0 || !is_reachable(fn, in_loop);
            }
            function append_var(decls, expressions, name, value) {
                var def = name.definition();
                // Name already exists, only when a function argument had the same name
                const already_appended = scope.variables.has(name.name);
                if (!already_appended) {
                    scope.variables.set(name.name, def);
                    scope.enclosed.push(def);
                    decls.push(make_node(AST_VarDef, name, {
                        name: name,
                        value: null
                    }));
                }
                var sym = make_node(AST_SymbolRef, name, name);
                def.references.push(sym);
                if (value)
                    expressions.push(make_node(AST_Assign, self, {
                        operator: "=",
                        logical: false,
                        left: sym,
                        right: value.clone()
                    }));
            }
            function flatten_args(decls, expressions) {
                var len = fn.argnames.length;
                for (var i = self.args.length; --i >= len;) {
                    expressions.push(self.args[i]);
                }
                for (i = len; --i >= 0;) {
                    var name = fn.argnames[i];
                    var value = self.args[i];
                    if (has_flag(name, UNUSED) || !name.name || scope.conflicting_def(name.name)) {
                        if (value)
                            expressions.push(value);
                    }
                    else {
                        var symbol = make_node(AST_SymbolVar, name, name);
                        name.definition().orig.push(symbol);
                        if (!value && in_loop)
                            value = make_node(AST_Undefined, self);
                        append_var(decls, expressions, symbol, value);
                    }
                }
                decls.reverse();
                expressions.reverse();
            }
            function flatten_vars(decls, expressions) {
                var pos = expressions.length;
                for (var i = 0, lines = fn.body.length; i < lines; i++) {
                    var stat = fn.body[i];
                    if (!(stat instanceof AST_Var))
                        continue;
                    for (var j = 0, defs = stat.definitions.length; j < defs; j++) {
                        var var_def = stat.definitions[j];
                        var name = var_def.name;
                        append_var(decls, expressions, name, var_def.value);
                        if (in_loop && fn.argnames.every((argname) => argname.name != name.name)) {
                            var def = fn.variables.get(name.name);
                            var sym = make_node(AST_SymbolRef, name, name);
                            def.references.push(sym);
                            expressions.splice(pos++, 0, make_node(AST_Assign, var_def, {
                                operator: "=",
                                logical: false,
                                left: sym,
                                right: make_node(AST_Undefined, name)
                            }));
                        }
                    }
                }
            }
            function flatten_fn(returned_value) {
                var decls = [];
                var expressions = [];
                flatten_args(decls, expressions);
                flatten_vars(decls, expressions);
                expressions.push(returned_value);
                if (decls.length) {
                    const i = scope.body.indexOf(compressor.parent(level - 1)) + 1;
                    scope.body.splice(i, 0, make_node(AST_Var, fn, {
                        definitions: decls
                    }));
                }
                return expressions.map(exp => exp.clone(true));
            }
        }