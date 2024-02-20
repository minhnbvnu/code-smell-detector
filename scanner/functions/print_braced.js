function print_braced(self, output, allow_directives) {
                if (self.body.length > 0) {
                    output.with_block(function () {
                        display_body(self.body, false, output, allow_directives);
                        output.add_mapping(self.end);
                    });
                }
                else
                    print_braced_empty(self, output);
            }