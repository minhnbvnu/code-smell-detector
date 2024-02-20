function print_property_key(self, output) {
        var key = self.key;
        if (key instanceof AST_Node) return output.with_square(function() {
            key.print(output);
        });
        var quote = self.start && self.start.quote;
        if (output.option("quote_keys") || quote && output.option("keep_quoted_props")) {
            output.print_string(key, quote);
        } else if ("" + +key == key && key >= 0) {
            output.print(make_num(key));
        } else if (self.private) {
            output.print_name(key);
        } else if (RESERVED_WORDS[key] ? !output.option("ie") : is_identifier_string(key)) {
            output.print_name(key);
            return key;
        } else {
            output.print_string(key, quote);
        }
    }