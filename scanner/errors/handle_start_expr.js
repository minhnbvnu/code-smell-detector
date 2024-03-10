function handle_start_expr() {
            if (start_of_statement()) {
                // The conditional starts the statement if appropriate.
            }

            var next_mode = MODE.Expression;
            if (current_token.text === '[') {

                if (last_type === 'TK_WORD' || flags.last_text === ')') {
                    // this is array index specifier, break immediately
                    // a[x], fn()[x]
                    if (last_type === 'TK_RESERVED' && in_array(flags.last_text, Tokenizer.line_starters)) {
                        output.space_before_token = true;
                    }
                    set_mode(next_mode);
                    print_token();
                    indent();
                    if (opt.space_in_paren) {
                        output.space_before_token = true;
                    }
                    return;
                }

                next_mode = MODE.ArrayLiteral;
                if (is_array(flags.mode)) {
                    if (flags.last_text === '[' ||
                        (flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}'))) {
                        // ], [ goes to new line
                        // }, [ goes to new line
                        if (!opt.keep_array_indentation) {
                            print_newline();
                        }
                    }
                }

            } else {
                if (last_type === 'TK_RESERVED' && flags.last_text === 'for') {
                    next_mode = MODE.ForInitializer;
                } else if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['if', 'while'])) {
                    next_mode = MODE.Conditional;
                } else {
                    // next_mode = MODE.Expression;
                }
            }

            if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
                print_newline();
            } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
                // TODO: Consider whether forcing this is required.  Review failing tests when removed.
                allow_wrap_or_preserved_newline(current_token.wanted_newline);
                // do nothing on (( and )( and ][ and ]( and .(
            } else if (!(last_type === 'TK_RESERVED' && current_token.text === '(') && last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
                output.space_before_token = true;
            } else if ((last_type === 'TK_RESERVED' && (flags.last_word === 'function' || flags.last_word === 'typeof')) ||
                (flags.last_text === '*' && last_last_text === 'function')) {
                // function() vs function ()
                if (opt.space_after_anon_function) {
                    output.space_before_token = true;
                }
            } else if (last_type === 'TK_RESERVED' && (in_array(flags.last_text, Tokenizer.line_starters) || flags.last_text === 'catch')) {
                if (opt.space_before_conditional) {
                    output.space_before_token = true;
                }
            }

            // Should be a space between await and an IIFE
            if(current_token.text === '(' && last_type === 'TK_RESERVED' && flags.last_word === 'await'){
                output.space_before_token = true;
            }

            // Support of this kind of newline preservation.
            // a = (b &&
            //     (c || d));
            if (current_token.text === '(') {
                if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                    if (!start_of_object_property()) {
                        allow_wrap_or_preserved_newline();
                    }
                }
            }

            set_mode(next_mode);
            print_token();
            if (opt.space_in_paren) {
                output.space_before_token = true;
            }

            // In all cases, if we newline while inside an expression it should be indented.
            indent();
        }