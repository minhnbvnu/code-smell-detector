function get_full_char(str, pos) {
            if (is_surrogate_pair_head(str.charCodeAt(pos))) {
                if (is_surrogate_pair_tail(str.charCodeAt(pos + 1))) {
                    return str.charAt(pos) + str.charAt(pos + 1);
                }
            }
            else if (is_surrogate_pair_tail(str.charCodeAt(pos))) {
                if (is_surrogate_pair_head(str.charCodeAt(pos - 1))) {
                    return str.charAt(pos - 1) + str.charAt(pos);
                }
            }
            return str.charAt(pos);
        }