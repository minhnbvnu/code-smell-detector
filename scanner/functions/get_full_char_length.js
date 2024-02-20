function get_full_char_length(str) {
            var surrogates = 0;
            for (var i = 0; i < str.length; i++) {
                if (is_surrogate_pair_head(str.charCodeAt(i)) && is_surrogate_pair_tail(str.charCodeAt(i + 1))) {
                    surrogates++;
                    i++;
                }
            }
            return str.length - surrogates;
        }