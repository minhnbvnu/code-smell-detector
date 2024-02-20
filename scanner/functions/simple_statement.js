function simple_statement(tmp) {
                return new AST_SimpleStatement({ body: (tmp = expression(true), semicolon(), tmp) });
            }