function doit() {
                    output.prepend_comments(self);
                    self.add_source_map(output);
                    generator(self, output);
                    output.append_comments(self);
                }