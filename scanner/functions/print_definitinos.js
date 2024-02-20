function print_definitinos(type) {
        return function(output) {
            var self = this;
            output.print(type);
            output.space();
            self.definitions.forEach(function(def, i) {
                if (i) output.comma();
                def.print(output);
            });
            var p = output.parent();
            if (!(p instanceof AST_IterationStatement && p.init === self)) output.semicolon();
        };
    }