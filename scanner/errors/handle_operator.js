function handle_operator() {
            if (start_of_statement()) {
                // The conditional starts the statement if appropriate.
            }

            if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
                // "return" had a special handling in TK_WORD. Now we need to return the favor
                output.space_before_token = true;
                print_token();
                return;
            }

            // hack for actionscript's import .*;
            if (current_token.text === '*' && last_type === 'TK_DOT') {
                print_token();
                return;
            }

            if (current_token.text === ':' && flags.in_case) {
                flags.case_body = true;
                indent();
                print_token();
                print_newline();
                flags.in_case = false;
                return;
            }

            if (current_token.text === '::') {
                // no spaces around exotic namespacing syntax operator
                print_token();
                return;
            }

            // Allow line wrapping between operators
            if (last_type === 'TK_OPERATOR') {
                allow_wrap_or_preserved_newline();
            }

            var space_before = true;
            var space_after = true;

            if (in_array(current_token.text, ['--', '++', '!', '~']) || (in_array(current_token.text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || in_array(flags.last_text, Tokenizer.line_starters) || flags.last_text === ','))) {
                // unary operators (and binary +/- pretending to be unary) special cases

                space_before = false;
                space_after = false;

                // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
                // if there is a newline between -- or ++ and anything else we should preserve it.
                if (current_token.wanted_newline && (current_token.text === '--' || current_token.text === '++')) {
                    print_newline(false, true);
                }

                if (flags.last_text === ';' && is_expression(flags.mode)) {
                    // for (;; ++i)
                    //        ^^^
                    space_before = true;
                }

                if (last_type === 'TK_RESERVED') {
                    space_before = true;
                } else if (last_type === 'TK_END_EXPR') {
                    space_before = !(flags.last_text === ']' && (current_token.text === '--' || current_token.text === '++'));
                } else if (last_type === 'TK_OPERATOR') {
                    // a++ + ++b;
                    // a - -b
                    space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(flags.last_text, ['--', '-', '++', '+']);
                    // + and - are not unary when preceeded by -- or ++ operator
                    // a-- + b
                    // a * +b
                    // a - -b
                    if (in_array(current_token.text, ['+', '-']) && in_array(flags.last_text, ['--', '++'])) {
                        space_after = true;
                    }
                }

                if ((flags.mode === MODE.BlockStatement || flags.mode === MODE.Statement) && (flags.last_text === '{' || flags.last_text === ';')) {
                    // { foo; --i }
                    // foo(); --bar;
                    print_newline();
                }
            } else if (current_token.text === ':') {
                if (flags.ternary_depth === 0) {
                    // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
                    space_before = false;
                } else {
                    flags.ternary_depth -= 1;
                }
            } else if (current_token.text === '?') {
                flags.ternary_depth += 1;
            } else if (current_token.text === '*' && last_type === 'TK_RESERVED' && flags.last_text === 'function') {
                space_before = false;
                space_after = false;
            }
            output.space_before_token = output.space_before_token || space_before;
            print_token();
            output.space_before_token = space_after;
        }