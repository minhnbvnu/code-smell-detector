function needs_parens_obj(output) {
        return !output.has_parens() && first_in_statement(output, true);
    }