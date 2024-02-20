function handle_comma() {
            if (flags.declaration_statement) {
                if (is_expression(flags.parent.mode)) {
                    // do not break on comma, for(var a = 1, b = 2)
                    flags.declaration_assignment = false;
                }

                print_token();

                if (flags.declaration_assignment) {
                    flags.declaration_assignment = false;
                    print_newline(false, true);
                } else {
                    output.space_before_token = true;
                    // for comma-first, we want to allow a newline before the comma
                    // to turn into a newline after the comma, which we will fixup later
                    if (opt.comma_first) {
                        allow_wrap_or_preserved_newline();
                    }
                }
                return;
            }

            print_token();
            if (flags.mode === MODE.ObjectLiteral ||
                (flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral)) {
                if (flags.mode === MODE.Statement) {
                    restore_mode();
                }
                print_newline();
            } else {
                // EXPR or DO_BLOCK
                output.space_before_token = true;
                // for comma-first, we want to allow a newline before the comma
                // to turn into a newline after the comma, which we will fixup later
                if (opt.comma_first) {
                    allow_wrap_or_preserved_newline();
                }
            }

        }