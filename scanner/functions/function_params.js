function function_params() {
        var id, paren = next_token, params = [];
        advance('(');
        step_in();
        no_space();
        if (next_token.id === ')') {
            no_space();
            step_out(')', paren);
            return;
        }
        for (;;) {
            edge();
            id = identifier();
            params.push(token);
            add_label(token, option.unparam ? 'parameter' : 'unparam');
            if (next_token.id === ',') {
                comma();
            } else {
                no_space();
                step_out(')', paren);
                return params;
            }
        }
    }