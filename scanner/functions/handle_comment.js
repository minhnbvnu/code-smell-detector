function handle_comment() {
            if (current_token.wanted_newline) {
                print_newline(false, true);
            } else {
                output.trim(true);
            }

            output.space_before_token = true;
            print_token();
            print_newline(false, true);
        }