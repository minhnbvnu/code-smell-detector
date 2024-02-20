function is_inert_body(branch) {
                return !aborts(branch) && !make_node(AST_BlockStatement, branch, {
                    body: branch.body
                }).has_side_effects(compressor);
            }