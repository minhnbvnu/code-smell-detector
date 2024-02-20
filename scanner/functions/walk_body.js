function walk_body(node, visitor) {
            const body = node.body;
            if (visitor.walk_defun_first) {
                for (var i = 0, len = body.length; i < len; i++) {
                    if (body[i] instanceof AST_Defun) {
                        body[i]._walk(visitor);
                    }
                }
                for (var i = 0, len = body.length; i < len; i++) {
                    if (!(body[i] instanceof AST_Defun)) {
                        body[i]._walk(visitor);
                    }
                }
            }
            else {
                for (var i = 0, len = body.length; i < len; i++) {
                    body[i]._walk(visitor);
                }
            }
        }