function print_maybe_braced_body(stat, output) {
                if (output.option("braces")) {
                    make_block(stat, output);
                }
                else {
                    if (!stat || stat instanceof AST_EmptyStatement)
                        output.force_semicolon();
                    else if (stat instanceof AST_Let || stat instanceof AST_Const || stat instanceof AST_Class)
                        make_block(stat, output);
                    else
                        stat.print(output);
                }
            }