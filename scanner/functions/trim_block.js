function trim_block(node, parent, in_list) {
        switch (node.body.length) {
          case 0:
            return in_list ? List.skip : make_node(AST_EmptyStatement, node);
          case 1:
            var stat = node.body[0];
            if (!safe_to_trim(stat)) return node;
            if (parent instanceof AST_IterationStatement && stat instanceof AST_LambdaDefinition) return node;
            return stat;
        }
        return node;
    }