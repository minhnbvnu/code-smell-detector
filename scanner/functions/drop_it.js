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