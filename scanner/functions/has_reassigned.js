function has_reassigned() {
            return !compressor.option("reduce_vars") || def.reassigned;
        }