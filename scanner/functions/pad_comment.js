function pad_comment(token, force) {
        if (need_newline_indented) return;
        if (token.nlb && (force || !has_nlb())) {
            need_newline_indented = true;
        } else if (force) {
            need_space = true;
        }
    }