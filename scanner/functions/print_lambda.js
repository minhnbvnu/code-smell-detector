function print_lambda(self, output) {
        if (self.name) {
            output.space();
            self.name.print(output);
        }
        print_funargs(self, output);
        output.space();
        print_braced(self, output, true);
    }