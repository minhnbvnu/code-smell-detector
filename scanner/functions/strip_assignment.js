function strip_assignment(def) {
            if (def) def.fixed = false;
            return (self.operator != "=" ? make_node(AST_Binary, self, {
                operator: self.operator.slice(0, -1),
                left: self.left,
                right: self.right,
            }) : maintain_this_binding(compressor, compressor.parent(), self, self.right)).optimize(compressor);
        }