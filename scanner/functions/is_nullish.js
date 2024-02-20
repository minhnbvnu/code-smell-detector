function is_nullish(node, compressor) {
            if (is_null_or_undefined(node, compressor))
                return true;
            return is_nullish_shortcircuited(node, compressor);
        }