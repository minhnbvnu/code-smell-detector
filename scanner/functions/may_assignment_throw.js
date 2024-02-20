function may_assignment_throw() {
                    const right = self.right;
                    self.right = make_node(AST_Null, right);
                    const may_throw = node.may_throw(compressor);
                    self.right = right;
                    return may_throw;
                }