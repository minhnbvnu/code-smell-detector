function is_binary_defined(compressor, op, node) {
            switch (op) {
              case "&&":
                return node.left.is_defined(compressor) && node.right.is_defined(compressor);
              case "||":
                return node.left.is_truthy() || node.right.is_defined(compressor);
              case "??":
                return node.left.is_defined(compressor) || node.right.is_defined(compressor);
              default:
                return true;
            }
        }