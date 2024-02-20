function opt_AST_Lambda(self, compressor) {
            tighten_body(self.body, compressor);
            if (compressor.option("side_effects")
                && self.body.length == 1
                && self.body[0] === compressor.has_directive("use strict")) {
                self.body.length = 0;
            }
            return self;
        }