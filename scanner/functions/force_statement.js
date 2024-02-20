function force_statement(stat, output) {
        if (output.option("braces") && !(stat instanceof AST_Const || stat instanceof AST_Let)) {
            make_block(stat, output);
        } else if (stat instanceof AST_EmptyStatement) {
            output.force_semicolon();
        } else {
            output.space();
            stat.print(output);
        }
    }