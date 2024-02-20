function as_statement_array_with_return(node, ab) {
                    var body = as_statement_array(node).slice(0, -1);
                    if (ab.value) {
                        body.push(make_node(AST_SimpleStatement, ab.value, {
                            body: ab.value.expression
                        }));
                    }
                    return body;
                }