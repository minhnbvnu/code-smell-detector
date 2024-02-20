function first_statement(body) {
            return body instanceof AST_BlockStatement ? body.body[0] : body;
        }