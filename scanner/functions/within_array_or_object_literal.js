function within_array_or_object_literal(compressor) {
            var node, level = 0;
            while (node = compressor.parent(level++)) {
                if (node instanceof AST_Statement)
                    return false;
                if (node instanceof AST_Array
                    || node instanceof AST_ObjectKeyVal
                    || node instanceof AST_Object) {
                    return true;
                }
            }
            return false;
        }