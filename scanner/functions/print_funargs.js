function print_funargs(self, output) {
        output.with_parens(function() {
            self.argnames.forEach(function(arg, i) {
                if (i) output.comma();
                arg.print(output);
            });
            if (self.rest) {
                if (self.argnames.length) output.comma();
                output.print("...");
                self.rest.print(output);
            }
        });
    }