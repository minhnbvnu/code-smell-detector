function print_arrow(self, output) {
        var argname = self.argnames.length == 1 && !self.rest && self.argnames[0];
        if (argname instanceof AST_SymbolFunarg && argname.name != "yield") {
            argname.print(output);
        } else {
            print_funargs(self, output);
        }
        output.space();
        output.print("=>");
        output.space();
        if (self.value) {
            self.value.print(output);
        } else {
            print_braced(self, output, true);
        }
    }