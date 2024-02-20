function drop_class(self, compressor, first_in_statement) {
            var exprs = [], values = [];
            var props = self.properties;
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (prop.key instanceof AST_Node) exprs.push(prop.key);
                if (prop.static && prop.value
                    && prop instanceof AST_ClassField
                    && prop.value.has_side_effects(compressor)) {
                    if (prop.value.contains_this()) return self;
                    values.push(prop.value);
                }
            }
            var base = self.extends;
            if (base) {
                if (base instanceof AST_SymbolRef) base = base.fixed_value();
                base = !safe_for_extends(base);
                if (!base) exprs.unshift(self.extends);
            }
            exprs = trim(exprs, compressor, first_in_statement);
            if (exprs) first_in_statement = false;
            values = trim(values, compressor, first_in_statement);
            if (!exprs) {
                if (!base && !values) return null;
                exprs = [];
            }
            if (base) {
                var node = to_class_expr(self, true);
                node.properties = [];
                if (exprs.length) node.properties.push(make_node(AST_ClassMethod, self, {
                    key: make_sequence(self, exprs),
                    value: make_node(AST_Function, self, {
                        argnames: [],
                        body: [],
                    }).init_vars(node),
                }));
                exprs = [ node ];
            }
            if (values) exprs.push(make_node(AST_Call, self, {
                expression: make_node(AST_Arrow, self, {
                    argnames: [],
                    body: [],
                    value: make_sequence(self, values),
                }).init_vars(self.parent_scope),
                args: [],
            }));
            return make_sequence(self, exprs);
        }