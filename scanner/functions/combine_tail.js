function combine_tail(consequent, alternative, top) {
            if (!is_tail_equivalent(consequent, alternative)) return !top && make_node(AST_Conditional, self, {
                condition: condition,
                consequent: consequent,
                alternative: alternative,
            });
            var node = consequent.clone();
            node.expression = combine_tail(consequent.expression, alternative.expression);
            return node;
        }