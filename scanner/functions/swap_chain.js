function swap_chain() {
            var rhs = self.right;
            self.left = make_node(AST_Binary, self, {
                operator: self.operator,
                left: self.left,
                right: rhs.left,
                start: self.left.start,
                end: rhs.left.end
            });
            self.right = rhs.right;
            self.left = self.left.transform(compressor);
        }