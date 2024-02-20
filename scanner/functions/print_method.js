function print_method(self, output) {
        var fn = self.value;
        if (is_async(fn)) {
            output.print("async");
            output.space();
        }
        if (is_generator(fn)) output.print("*");
        print_property_key(self, output);
        print_lambda(self.value, output);
    }