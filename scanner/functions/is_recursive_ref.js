function is_recursive_ref(compressor, def) {
            var node;
            for (var i = 0; node = compressor.parent(i); i++) {
                if (node instanceof AST_Lambda || node instanceof AST_Class) {
                    var name = node.name;
                    if (name && name.definition() === def) {
                        return true;
                    }
                }
            }
            return false;
        }