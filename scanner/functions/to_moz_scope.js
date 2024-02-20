function to_moz_scope(type, node) {
                var body = node.body.map(to_moz);
                if (node.body[0] instanceof AST_SimpleStatement && node.body[0].body instanceof AST_String) {
                    body.unshift(to_moz(new AST_EmptyStatement(node.body[0])));
                }
                return {
                    type: type,
                    body: body
                };
            }