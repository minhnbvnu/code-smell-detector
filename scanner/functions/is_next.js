function is_next(find) {
            var local_pos = parser_pos;
            var c = input.charAt(local_pos);
            while (in_array(c, whitespace) && c !== find) {
                local_pos++;
                if (local_pos >= input_length) {
                    return false;
                }
                c = input.charAt(local_pos);
            }
            return c === find;
        }