function print_properties(self, output, no_comma) {
        var props = self.properties;
        if (props.length > 0) output.with_block(function() {
            props.forEach(function(prop, i) {
                if (i) {
                    if (!no_comma) output.print(",");
                    output.newline();
                }
                output.indent();
                prop.print(output);
            });
            output.newline();
        });
        else print_braced_empty(self, output);
    }