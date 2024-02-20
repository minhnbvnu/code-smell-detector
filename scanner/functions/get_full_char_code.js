function get_full_char_code(str, pos) {
            // https://en.wikipedia.org/wiki/Universal_Character_Set_characters#Surrogates
            if (is_surrogate_pair_head(str.charCodeAt(pos))) {
                return 0x10000 + (str.charCodeAt(pos) - 0xd800 << 10) + str.charCodeAt(pos + 1) - 0xdc00;
            }
            return str.charCodeAt(pos);
        }