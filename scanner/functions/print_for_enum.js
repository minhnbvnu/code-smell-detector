function print_for_enum(prefix, infix) {
        return function(output) {
            var self = this;
            output.print(prefix);
            output.space();
            output.with_parens(function() {
                self.init.print(output);
                output.space();
                output.print(infix);
                output.space();
                self.object.print(output);
            });
            force_statement(self.body, output);
        };
    }