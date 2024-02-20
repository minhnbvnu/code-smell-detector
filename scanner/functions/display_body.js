function display_body(body, is_toplevel, output, allow_directives) {
                var last = body.length - 1;
                output.in_directive = allow_directives;
                body.forEach(function (stmt, i) {
                    if (output.in_directive === true && !(stmt instanceof AST_Directive ||
                        stmt instanceof AST_EmptyStatement ||
                        (stmt instanceof AST_SimpleStatement && stmt.body instanceof AST_String))) {
                        output.in_directive = false;
                    }
                    if (!(stmt instanceof AST_EmptyStatement)) {
                        output.indent();
                        stmt.print(output);
                        if (!(i == last && is_toplevel)) {
                            output.newline();
                            if (is_toplevel)
                                output.newline();
                        }
                    }
                    if (output.in_directive === true &&
                        stmt instanceof AST_SimpleStatement &&
                        stmt.body instanceof AST_String) {
                        output.in_directive = false;
                    }
                });
                output.in_directive = false;
            }