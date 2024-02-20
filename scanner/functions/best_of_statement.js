function best_of_statement(ast1, ast2) {
            return best_of_expression(make_node(AST_SimpleStatement, ast1, {
                body: ast1
            }), make_node(AST_SimpleStatement, ast2, {
                body: ast2
            })).body;
        }