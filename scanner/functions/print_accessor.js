function print_accessor(type) {
        return function(output) {
            var self = this;
            if (self.static) {
                output.print("static");
                output.space();
            }
            output.print(type);
            output.space();
            print_property_key(self, output);
            print_lambda(self.value, output);
        };
    }