function print_token_line_indentation() {
            if (output.just_added_newline()) {
                if (opt.keep_array_indentation && is_array(flags.mode) && current_token.wanted_newline) {
                    output.current_line.push(current_token.whitespace_before);
                    output.space_before_token = false;
                } else if (output.set_indent(flags.indentation_level)) {
                    flags.line_indent_level = flags.indentation_level;
                }
            }
        }