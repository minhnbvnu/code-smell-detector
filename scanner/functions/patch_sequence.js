function patch_sequence(node) {
                if (node instanceof AST_Sequence) switch (node.expressions.length) {
                  case 0: return null;
                  case 1: return maintain_this_binding(compressor, this.parent(), node, node.expressions[0]);
                }
            }