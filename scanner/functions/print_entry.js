function print_entry(index) {
            var alias = self.aliases[index];
            var key = self.keys[index];
            output.print_name(key);
            if (alias != key) {
                output.space();
                output.print("as");
                output.space();
                output.print_name(alias);
            }
        }