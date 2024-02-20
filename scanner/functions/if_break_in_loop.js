function if_break_in_loop(self, compressor) {
            var first = self.body instanceof AST_BlockStatement ? self.body.body[0] : self.body;
            if (compressor.option("dead_code") && is_break(first)) {
                var body = [];
                if (self.init instanceof AST_Statement) {
                    body.push(self.init);
                }
                else if (self.init) {
                    body.push(make_node(AST_SimpleStatement, self.init, {
                        body: self.init
                    }));
                }
                if (self.condition) {
                    body.push(make_node(AST_SimpleStatement, self.condition, {
                        body: self.condition
                    }));
                }
                trim_unreachable_code(compressor, self.body, body);
                return make_node(AST_BlockStatement, self, {
                    body: body
                });
            }
            if (first instanceof AST_If) {
                if (is_break(first.body)) {
                    if (self.condition) {
                        self.condition = make_node(AST_Binary, self.condition, {
                            left: self.condition,
                            operator: "&&",
                            right: first.condition.negate(compressor),
                        });
                    }
                    else {
                        self.condition = first.condition.negate(compressor);
                    }
                    drop_it(first.alternative);
                }
                else if (is_break(first.alternative)) {
                    if (self.condition) {
                        self.condition = make_node(AST_Binary, self.condition, {
                            left: self.condition,
                            operator: "&&",
                            right: first.condition,
                        });
                    }
                    else {
                        self.condition = first.condition;
                    }
                    drop_it(first.body);
                }
            }
            return self;
            function is_break(node) {
                return node instanceof AST_Break
                    && compressor.loopcontrol_target(node) === compressor.self();
            }
            function drop_it(rest) {
                rest = as_statement_array(rest);
                if (self.body instanceof AST_BlockStatement) {
                    self.body = self.body.clone();
                    self.body.body = rest.concat(self.body.body.slice(1));
                    self.body = self.body.transform(compressor);
                }
                else {
                    self.body = make_node(AST_BlockStatement, self.body, {
                        body: rest
                    }).transform(compressor);
                }
                self = if_break_in_loop(self, compressor);
            }
        }