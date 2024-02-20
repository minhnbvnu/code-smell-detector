function extract_exprs(body) {
            if (body instanceof AST_Assign) return [ body ];
            if (body instanceof AST_Sequence) return body.expressions.slice();
        }