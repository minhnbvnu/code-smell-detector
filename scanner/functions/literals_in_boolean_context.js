function literals_in_boolean_context(self, compressor) {
            if (compressor.in_boolean_context()) {
                return best_of(compressor, self, make_sequence(self, [
                    self,
                    make_node(AST_True, self)
                ]).optimize(compressor));
            }
            return self;
        }