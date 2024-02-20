function best(orig, alt, first_in_statement) {
                var negated = basic_negation(orig);
                if (first_in_statement) {
                    var stat = make_node(AST_SimpleStatement, alt, {
                        body: alt
                    });
                    return best_of_expression(negated, stat) === stat ? alt : negated;
                }
                return best_of_expression(negated, alt);
            }