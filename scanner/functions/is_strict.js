function is_strict(compressor) {
                return /strict/.test(compressor.option("pure_getters"));
            }