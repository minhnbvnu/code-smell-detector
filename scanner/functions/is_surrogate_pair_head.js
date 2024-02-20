function is_surrogate_pair_head(code) {
            return code >= 0xd800 && code <= 0xdbff;
        }