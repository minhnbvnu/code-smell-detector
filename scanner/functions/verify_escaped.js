function verify_escaped(ref, depth) {
            var escaped = ref.definition().escaped;
            switch (escaped.length) {
              case 0:
                return true;
              case 1:
                var found = false;
                escaped[0].walk(new TreeWalker(function(node) {
                    if (found) return true;
                    if (node === ref) return found = true;
                    if (node instanceof AST_Scope) return true;
                }));
                return found;
              default:
                return depth <= escaped.depth;
            }
        }