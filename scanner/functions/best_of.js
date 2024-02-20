function best_of(compressor, ast1, ast2) {
            if (first_in_statement(compressor)) {
                return best_of_statement(ast1, ast2);
            }
            else {
                return best_of_expression(ast1, ast2);
            }
        }