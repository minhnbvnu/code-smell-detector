function flatten_destructured(decls, expressions) {
            expressions.push(make_node(AST_Assign, self, {
                operator: "=",
                left: make_node(AST_DestructuredArray, self, {
                    elements: fn.argnames.map(function(argname) {
                        if (argname.__unused) return make_node(AST_Hole, argname);
                        return argname.convert_symbol(AST_SymbolRef, process);
                    }),
                    rest: fn.rest && fn.rest.convert_symbol(AST_SymbolRef, process),
                }),
                right: make_node(AST_Array, self, { elements: self.args.slice() }),
            }));

            function process(ref, name) {
                var def = name.definition();
                def.references.push(ref);
                var symbol = make_node(AST_SymbolVar, name, name);
                def.orig.push(symbol);
                append_var(decls, expressions, symbol);
            }
        }