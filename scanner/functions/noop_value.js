function noop_value() {
            return self.call_only ? make_node(AST_Number, self, { value: 0 }) : make_node(AST_Undefined, self);
        }