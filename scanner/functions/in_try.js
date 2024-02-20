function in_try(level, node) {
                function may_assignment_throw() {
                    const right = self.right;
                    self.right = make_node(AST_Null, right);
                    const may_throw = node.may_throw(compressor);
                    self.right = right;
                    return may_throw;
                }
                var stop_at = self.left.definition().scope.get_defun_scope();
                var parent;
                while ((parent = compressor.parent(level++)) !== stop_at) {
                    if (parent instanceof AST_Try) {
                        if (parent.bfinally)
                            return true;
                        if (parent.bcatch && may_assignment_throw())
                            return true;
                    }
                }
            }