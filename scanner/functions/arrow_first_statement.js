function arrow_first_statement() {
        if (this.value) return make_node(AST_Return, this.value, {
            value: this.value
        });
        return skip_directives(this.body);
    }