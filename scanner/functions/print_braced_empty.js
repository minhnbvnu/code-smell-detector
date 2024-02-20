function print_braced_empty(self, output) {
                output.print("{");
                output.with_indent(output.next_indent(), function () {
                    output.append_comments(self, true);
                });
                output.add_mapping(self.end);
                output.print("}");
            }