function make_block(stmt, output) {
                if (!stmt || stmt instanceof AST_EmptyStatement)
                    output.print("{}");
                else if (stmt instanceof AST_BlockStatement)
                    stmt.print(output);
                else
                    output.with_block(function () {
                        output.indent();
                        stmt.print(output);
                        output.newline();
                    });
            }