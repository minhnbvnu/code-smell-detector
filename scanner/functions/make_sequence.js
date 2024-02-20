function make_sequence(orig, expressions) {
            if (expressions.length == 1)
                return expressions[0];
            if (expressions.length == 0)
                throw new Error("trying to create a sequence with length zero!");
            return make_node(AST_Sequence, orig, {
                expressions: expressions.reduce(merge_sequence, [])
            });
        }